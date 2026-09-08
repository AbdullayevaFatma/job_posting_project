"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function createJob(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.job.create({
    data: {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      salary: formData.get("salary") as string,
      postedById: session.user.id,
    },
  });
}