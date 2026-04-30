"use server";

import { prisma } from "@/app/lib/prisma";

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
