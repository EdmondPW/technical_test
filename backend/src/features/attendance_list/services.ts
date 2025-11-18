import { eq } from "drizzle-orm";
import { db } from "../../db";
import { attendanceList } from "../../db/schema/attendance_list.schema";
import { AttendanceListType } from "./schema.zod";

export async function getAttendanceListByAttendanceId(
  attendanceId: number
): Promise<AttendanceListType[] | null> {
  try {
    const rows = await db
      .select()
      .from(attendanceList)
      .where(eq(attendanceList.attendanceId, attendanceId));

    // Optional: return null if empty
    if (rows.length === 0) return null;

    return rows;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    throw error;
  }
}
