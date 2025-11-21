import { DATABASE_URL } from "../Config/defaults";
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
console.log("Accelerate Database URL:", DATABASE_URL);
export const prisma = new PrismaClient({
  accelerateUrl: DATABASE_URL,
}).$extends(withAccelerate());
// use `prisma` in your application to read and write data in your DB
