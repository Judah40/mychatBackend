// import Redis from "ioredis";
// import { Queue, Worker } from "bullmq";
// import { REDISENDPOINTURL, REDISPASSWORD, REDISPORT } from "../Config/defaults";
// import { prisma } from "./prismaClient";
// // Assuming REDISENDPOINTURL, REDISPORT, and REDISPASSWORD are defined/imported
// // and prisma is correctly instantiated once.

// // 1. Instantiate Prisma Client globally once

// // 2. Define a type guard for Prisma Errors
// // This allows for safer type checking without 'as any'
// interface PrismaError extends Error {
//   code: string;
// }

// const isPrismaError = (error: unknown): error is PrismaError => {
//   return (
//     typeof error === "object" &&
//     error !== null &&
//     "code" in error &&
//     typeof (error as PrismaError).code === "string"
//   );
// };

// const connection = new Redis({
//   host: REDISENDPOINTURL,
//   port: parseInt(REDISPORT),
//   password: REDISPASSWORD,
//   // tls: {
//   //   rejectUnauthorized: false, // Required for secure cloud connection
//   // },
//   maxRetriesPerRequest: null,
// });

// export const workerJob = new Worker(
//   "deletionQueue",
//   async (job) => {
//     const { statusId } = job.data as { statusId: number }; // Use the correct type for your ID

//     try {
//       await prisma.status.delete({
//         where: { statusId },
//       });
//       console.log(`✅ Successfully deleted status ID: ${statusId}`); // Add success log
//     } catch (error) {
//       if (isPrismaError(error) && error.code === "P2025") {
//         // P2025: Record to delete does not exist (e.g., already deleted)
//         console.warn(
//           `Record ID ${statusId} already deleted or not found. Skipping.`
//         );
//       } else {
//         console.error(`❌ ERROR deleting status ID ${statusId}:`, error);
//         // Re-throw to signal BullMQ to retry the job
//         throw error;
//       }
//     }
//   },
//   { connection }
// );

// const deletetionQueue = new Queue("deletionQueue", { connection });
// const MS_IN_DAY = 24 * 60 * 60 * 1000;
// export const scheduleDeletion = async (statusId: string) => {
//   await deletetionQueue.add(
//     "delete-status-in-24-hours",
//     { statusId },
//     {
//       delay: MS_IN_DAY,
//       removeOnComplete: true,
//       removeOnFail: false,
//     }
//   );
//   console.log(
//     `Job scheduled: Message ID ${statusId} will be deleted in 24 hours.`
//   );
// };
