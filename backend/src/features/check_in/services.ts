import { AttendanceListCheckInInput } from "./schema.zod";
import { db } from "../../db/index";
import { attendanceList } from "../../db/schema/attendance_list.schema";
import { and, eq } from "drizzle-orm";

type checkinResult = {
  ok: boolean;
  checkin: string;
  message: string;
  error?: any;
};

export const checkin = async ({
  attendanceId,
  userId,
  checkInTime,
}: AttendanceListCheckInInput): Promise<checkinResult> => {
  try {
    const checkCheckIn = await db
      .select()
      .from(attendanceList)
      .where(
        and(
          eq(attendanceList.attendanceId, attendanceId),
          eq(attendanceList.userId, userId)
        )
      );

    if (checkCheckIn.length > 0 && checkCheckIn[0].checkInTime == null) {
      await db
        .update(attendanceList)
        .set({
          checkInTime: checkInTime,
        })
        .where(
          and(
            eq(attendanceList.attendanceId, attendanceId),
            eq(attendanceList.userId, userId)
          )
        );

      return { ok: true, checkin: "accepted", message: "employee checked in." };
    } else {
      return {
        ok: false,
        checkin: "denied",
        message: "employee can only check in once.",
      };
    }
  } catch (error) {
    return {
      ok: false,
      checkin: "denied",
      message: "error",
      error: error,
    };
  }
};
