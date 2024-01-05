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

export async function isTweetBookmarked(username: string, tweetId: number) {
  const bookmark = await prisma.bookmark.findFirst({
    where: {
      username: username,
      tweetId: tweetId,
    },
  });

  return Boolean(bookmark);
}

export const unbookmarkTweet = async (formData: FormData) => {
  const username = String(formData.get("username"));
  const tweetId = Number(formData.get("tweetId"));
  await prisma.bookmark.deleteMany({
    where: {
      username: username,
      tweetId: tweetId,
    },
  });
  revalidatePath("/home");
};

export const getBookmarks = async (username: string) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      username: username,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const bookmarkedTweetIds = bookmarks.map((bookmark) => bookmark.tweetId);

  return bookmarkedTweetIds;
};
