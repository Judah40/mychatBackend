import { prisma } from "../lib/prismaClient";
import { DATABASE_URL } from "./defaults";
interface App {
  listen: (port: number, callback?: () => void) => void;
}

export const startServer = async (app: App): Promise<void> => {
  console.log(DATABASE_URL);
  try {
    await prisma.$connect();
    app.listen(3000, () => {
      console.log(`Server is running on http://localhost:${3000}`);
    });
  } catch (error: unknown) {
    console.error("Failed to connect to the database:", error);
  }
};
