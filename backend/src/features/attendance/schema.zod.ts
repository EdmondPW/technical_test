import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { attendance } from "../../db/schema/attendance.schema";

const attendanceSchema = createSelectSchema(attendance);

export const attendanceFields = attendanceSchema
  .pick({
    id: true,
    attendanceDate: true,
    checkInTime: true,
    checkOutTime: true,
  })
  .required({
    attendanceDate: true,
    checkInTime: true,
    checkOutTime: true,
  });

export const attendanceByIdFields = attendanceSchema.pick({
  id: true,
});

export type Attendance = z.infer<typeof attendanceFields>;
export type AttendanceById = z.infer<typeof attendanceByIdFields>;
