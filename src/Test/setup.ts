// test/setup.ts
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prismaClient";

export interface TestUser {
  id: number;
  phoneNumber: string;
  token: string;
}

const JWT_SECRET = "mocked-token";
export const createTestUser = async (): Promise<TestUser> => {
  const randomPhone = `+23277${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`;
  const user = await prisma.user.create({
    data: {
      phoneNumber: randomPhone,
    },
  });
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { id: user.id, phoneNumber: randomPhone, token };
};

export const deleteTestUser = async (id: number) => {
  await prisma.user.delete({ where: { id } });
};
