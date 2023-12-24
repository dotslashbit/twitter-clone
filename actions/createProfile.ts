"use server";

import prisma from "@/lib/prisma";

export async function createProfile(formData: FormData) {
  const username = formData.get("username");
  const bio = formData.get("bio");
  await prisma.profile.create({
    data: {
      username: username as string,
      bio: bio as string,
    },
  });
}
