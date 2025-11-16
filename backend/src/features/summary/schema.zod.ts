import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { summary } from "../../db/schema/summary.schema";

const summarySchema = createSelectSchema(summary);

export const summaryInputField = summarySchema
  .pick({
    id: true,
    attendanceId: true,
    present: true,
    late: true,
    earlyLeave: true,
    absent: true,
  })
  .required({
    id: true,
    attendanceId: true,
  });

export type SummaryInput = z.infer<typeof summaryInputField>;
