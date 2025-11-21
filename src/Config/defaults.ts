import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const ACCELERATE_DATABASE_URL =
  process.env.ACCELERATE_DATABASE_URL || "";
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
