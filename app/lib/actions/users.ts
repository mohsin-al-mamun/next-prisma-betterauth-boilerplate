"use server";

import { prisma } from "@/app/lib/prisma";

// ✅ fetch all the users
export async function getUsers() {
  return await prisma.user.findMany();
}

// ✅ update user
export async function updateUser(
  id: string,
  data: { name: string; email: string },
) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

// ✅ delete user
export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

// ✅ create user

export async function createUser(data: { name: string; email: string }) {
  return prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
