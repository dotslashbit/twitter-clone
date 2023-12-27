"use server";

import prisma from "@/lib/prisma";

export const createUser = async (id) => {
  // Check if a user with the given ID already exists
  let user = await prisma.user.findUnique({
    where: { id },
  });

  // If the user doesn't exist, create a new user
  if (!user) {
    user = await prisma.user.create({
      data: { id },
    });
  }
};
