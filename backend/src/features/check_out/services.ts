import { AttendanceListCheckOutInput } from "./schema.zod";
import { db } from "../../db/index";
import { attendanceList } from "../../db/schema/attendance_list.schema";
import { and, eq } from "drizzle-orm";

type checkoutResult = {
  ok: boolean;
  checkout: string;
  message: string;
  error?: any;
};

export const checkout = async ({
  attendanceId,
  userId,
  checkOutTime,
}: AttendanceListCheckOutInput): Promise<checkoutResult> => {
  try {
    const checkCheckOut = await db
      .select()
      .from(attendanceList)
      .where(
        and(
          eq(attendanceList.attendanceId, attendanceId),
          eq(attendanceList.userId, userId)
        )
      );

    if (
      checkCheckOut.length > 0 &&
      checkCheckOut[0].checkOutTime == null &&
      checkCheckOut[0].checkInTime != null
    ) {
      await db
        .update(attendanceList)
        .set({
          checkOutTime: checkOutTime,
        })
        .where(
          and(
            eq(attendanceList.attendanceId, attendanceId),
            eq(attendanceList.userId, userId)
          )
        );

      return {
        ok: true,
        checkout: "accepted",
        message: "employee checked out.",
      };
    } else {
      return {
        ok: false,
        checkout: "denied",
        message: "employee can only check out once and already check out.",
      };
    }
  } catch (error) {
    return {
      ok: false,
      checkout: "denied",
      message: "error",
      error: error,
    };
  }
};
