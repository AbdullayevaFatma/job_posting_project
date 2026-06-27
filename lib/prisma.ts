import { PrismaClient } from "@/prisma/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg"


const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

const createPrismaClient = () => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });

  return new PrismaClient({
    adapter,
  });
};

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}