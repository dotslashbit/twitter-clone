"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const createComment = async (formData: FormData, tweetId) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  // console.log(formData.get("comment"));

  const content = formData.get("comment");

  console.log(formData);
  await prisma.comment.create({
    data: {
      tweetId: tweetId as number,
      content: content as string,
    },
  });
  revalidatePath("/home");
};

export const getComments = async () => {
  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};
