import { Worker } from "bullmq";
import { handleEvent } from "./services";

const worker = new Worker(
  "attendance-events",
  async (job) => {
    console.log("Processing job", job.id, job.data);

    await handleEvent(job.data);
  },
  {
    connection: { host: "localhost", port: 6379 },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});
