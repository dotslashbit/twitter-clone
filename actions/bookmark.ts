"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// actions/bookmarkTweet.ts

export const bookmarkTweet = async (formData: FormData) => {
  const username = String(formData.get("username"));
  const tweetId = Number(formData.get("tweetId"));
  await prisma.bookmark.create({
    data: {
      username,
      tweetId,
    },
  });
  revalidatePath("/home");
};
