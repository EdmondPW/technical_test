import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { attendanceList } from "../../db/schema/attendance_list.schema";

const attendanceListSchema = createSelectSchema(attendanceList);

export const attendanceListFields = attendanceListSchema
  .pick({
    id: true,
    userId: true,
    attendanceId: true,
    attendanceStatus: true,
    checkInTime: true,
    checkOutTime: true,
  })
  .required({
    id: true,
    userId: true,
    attendanceId: true,
  });

export type AttendanceListType = z.infer<typeof attendanceListFields>;
