"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const onFollow = async (formData: FormData) => {
  const followingId = formData.get("followingId");
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  const followerId = user.id;
  await prisma.follow.create({
    data: {
      followingId: followingId as string,
      followerId: followerId as string,
    },
  });
};

export const getFollowers = async (username: string) => {
  const followers = await prisma.follow.findMany({
    where: {
      following: {
        username: username,
      },
    },
  });
  return followers;
};

export const getFollowing = async (username: string) => {
  const following = await prisma.follow.findMany({
    where: {
      follower: {
        username: username,
      },
    },
  });
  return following;
};
