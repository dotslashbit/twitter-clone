"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const createUser = async (id) => {
  // Check if a user with the given ID already exists
  let user = await prisma.user.findUnique({
    where: { id },
  });

  // If the user doesn't exist, create a new user
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: id as string,
        username: "default",
      },
    });
  }

  const clerkUser = await currentUser();
  if (clerkUser) {
    await prisma.user.update({
      where: { id },
      data: {
        username: clerkUser.username,
      },
    });
  }
};
