import { eq } from "drizzle-orm";
import { db } from "../../db";
import { attendance } from "../../db/schema/attendance.schema";
import { attendanceList } from "../../db/schema/attendance_list.schema";

export async function getAllAttendance() {
  const result = await db.select().from(attendance);
  return result;
}

export async function getTodayAttendance() {
  const today = new Date().toISOString().split("T")[0];
  // converts to YYYY-MM-DD (matches postgres date format)

  const result = await db
    .select()
    .from(attendance)
    .where(eq(attendance.attendanceDate, today));

  return result;
}

export async function getAttendanceById(attendanceId: number) {
  // Fetch the attendance record
  const attendanceRecord = await db
    .select()
    .from(attendance)
    .where(eq(attendance.id, attendanceId))
    .limit(1);

  if (attendanceRecord.length === 0) return null;

  // Fetch attendance_list items for this attendance
  const listRecords = await db
    .select()
    .from(attendanceList)
    .where(eq(attendanceList.attendanceId, attendanceId));

  return {
    attendance: attendanceRecord[0],
    attendanceList: listRecords,
  };
}
