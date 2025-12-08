// import { workerJob } from "./lib/redisClient";

// setInterval(() => {
//   console.log("🟢 Worker is alive", new Date().toISOString());
// }, 10000); // every 10 seconds
// //WORKERS
// workerJob.on("completed", (job) => {
//   console.log(`${job.name} job ${job.id} completed.`);
// });

// workerJob.on("failed", (job, err) => {
//   console.error(`❌ Job ${job?.id} failed:`, err);
// });

// workerJob.on("error", (err) => {
//   console.error("Worker error:", err);
// });

// workerJob.on("active", (job) => {
//   console.log(`Job ${job.id} is now active`);
// });

// workerJob.on("stalled", (jobId) => {
//   console.warn(`Job ${jobId} stalled`);
// });

// "start:worker": "ts-node -r ./env-loader.ts src/worker.ts"
