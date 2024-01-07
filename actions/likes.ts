"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const addLikes = async (tweetId: number) => {
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

export const isLiked = async (tweetId: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  const userId = user.id;
  const like = await prisma.like.findFirst({
    where: {
      userId: userId as string,
      tweetId: tweetId as number,
    },
  });
  console.log(like);
  return Boolean(like);
};

export const unLike = async (tweetId: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  const userId = user.id;
  await prisma.like.deleteMany({
    where: {
      AND: [
        {
          userId: userId as string,
        },
        {
          tweetId: tweetId as number,
        },
      ],
    },
  });
  revalidatePath("/home");
};
