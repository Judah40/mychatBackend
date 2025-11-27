import { prisma } from "../lib/prismaClient";
import { DATABASE_URL, PORT } from "./defaults";
interface App {
  listen: (port: number, callback?: () => void) => void;
}

export const startServer = async (app: App): Promise<void> => {
  try {
    await prisma.$connect();

    await new Promise<void>((resolve) => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        resolve();
      });
    });
  } catch (error: unknown) {
    console.error("Failed to connect to the database:", error);
  }
};
