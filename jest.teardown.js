import { prisma } from "./src/lib/prismaClient.js";

export default async () => {
  await prisma.$disconnect();
};
