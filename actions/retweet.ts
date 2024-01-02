"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const retweet = async (formData: FormData) => {
  const tweetId = Number(formData.get("tweetId"));
  const username = formData.get("username") as string;
  return await prisma.retweet.create({
    data: {
      tweetId: tweetId,
      username: username,
    },
  });
  revalidatePath("/home");
};
