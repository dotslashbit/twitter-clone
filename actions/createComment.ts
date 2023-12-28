"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const createComment = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  // console.log(formData.get("comment"));

  console.log(formData);
  const content = formData.get("comment");
  const tweetId = Number(formData.get("tweetId"));
  const userId = user.id;

  await prisma.comment.create({
    data: {
      userId: userId as string,
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
