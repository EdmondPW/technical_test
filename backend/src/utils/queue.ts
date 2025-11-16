import { Queue } from "bullmq";

export const attendanceQueue = new Queue("attendance-events", {
  connection: { host: "127.0.0.1", port: 6379 },
});
