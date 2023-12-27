"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const addLikes = async (tweetId) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  const userId = user.id;
  console.log(typeof tweetId);
  await prisma.like.create({
    data: {
      userId: userId as string,
      tweetId: tweetId as number,
    },
  });
  revalidatePath("/home");
};

export const getLikes = async () => {
  const likes = await prisma.like.findMany();
  console.log(likes);
  return likes;
  // return length(likes);
};
