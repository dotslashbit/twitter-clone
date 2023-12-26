"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addLikes = async (tweetId) => {
  console.log(typeof tweetId);
  await prisma.like.create({
    data: {
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
