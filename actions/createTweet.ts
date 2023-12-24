"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createTweet = async (formData: FormData) => {
  const content = formData.get("tweet");
  await prisma.tweet.create({
    data: {
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
