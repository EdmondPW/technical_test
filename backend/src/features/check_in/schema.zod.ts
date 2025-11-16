import { z } from "zod";
import { createUpdateSchema } from "drizzle-zod";
import { attendanceList } from "../../db/schema/attendance_list.schema";

const attendanceListUpdateSchema = createUpdateSchema(attendanceList);

export const attendanceListCheckInInputFields = attendanceListUpdateSchema
  .pick({
    attendanceId: true,
    userId: true,
    checkInTime: true,
  })
  .required({
    attendanceId: true,
    userId: true,
    checkInTime: true,
  })
  .extend({
    checkInTime: z.coerce.date().nullable(),
  });

export type AttendanceListCheckInInput = z.infer<
  typeof attendanceListCheckInInputFields
>;
