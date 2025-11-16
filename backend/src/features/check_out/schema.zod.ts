import { z } from "zod";
import { createUpdateSchema } from "drizzle-zod";
import { attendanceList } from "../../db/schema/attendance_list.schema";

const attendanceListUpdateSchema = createUpdateSchema(attendanceList);

export const attendanceListCheckOutInputFields = attendanceListUpdateSchema
  .pick({
    attendanceId: true,
    userId: true,
    checkOutTime: true,
  })
  .required({
    attendanceId: true,
    userId: true,
    checkOutTime: true,
  })
  .extend({
    checkOutTime: z.coerce.date().nullable(),
  });

export type AttendanceListCheckOutInput = z.infer<
  typeof attendanceListCheckOutInputFields
>;
