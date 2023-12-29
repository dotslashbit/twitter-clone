"use server";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs";

export const getProfile = async (username: string) => {
  const userFromDB = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
  });

  if (!userFromDB) {
    return null;
  }

  console.log(userFromDB);

  const userFromClerk = await clerkClient.users.getUser(userFromDB.id);
  console.log(userFromClerk);

  // Now you can combine the data as needed
  const user = {
    id: userFromDB.id,
    username: userFromDB.username,
    profileImg: userFromClerk.imageUrl,
    firstName: userFromClerk.firstName,
    lastName: userFromClerk.lastName,
    // Add other properties from userFromClerk if needed
  };

  console.log("data from getProfile", user);

  return user;
};

export const getTweetsForProfile = async (username: string) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      username: username as string,
    },
  });
  return tweets;
};
