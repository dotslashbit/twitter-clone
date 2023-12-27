"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const createTweet = async (formData: FormData) => {
  const user = await currentUser();
  const username = user?.username;
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  const userId = user.id;

  const content = formData.get("tweet");
  await prisma.tweet.create({
    data: {
      userId: userId as string,
      username: username as string,
      content: content as string,
    },
  });
  revalidatePath("/home");
};

export const getTweets = async () => {
  const tweets = await prisma.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
};
