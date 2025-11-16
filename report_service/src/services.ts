import { eq, and } from "drizzle-orm";
import { getTodayDateString } from "./utils/get_today_date";
import { attendanceList } from "./db/schema/attendance_list.schema";
import { summary } from "./db/schema/summary.schema";
import { attendance } from "./db/schema/attendance.schema";
import { db } from "./db";

export const handleEvent = async (event: {
  type: "checkin" | "checkout";
  userId: string;
  attendanceId: string;
}) => {
  const attendanceListData = await db
    .select()
    .from(attendanceList)
    .where(
      and(
        eq(attendanceList.userId, event.userId),
        eq(attendanceList.attendanceId, parseInt(event.attendanceId))
      )
    )
    .limit(1);

  const attendanceData = await db
    .select()
    .from(attendance)
    .where(eq(attendance.id, parseInt(event.attendanceId)));

  const checkSummary = await db
    .select()
    .from(summary)
    .where(eq(summary.attendanceId, attendanceData[0].id));

  let summaryData = null;
  if (checkSummary.length <= 0) {
    summaryData = await db
      .insert(summary)
      .values({ attendanceId: attendanceData[0].id })
      .returning();
  } else {
    summaryData = await db
      .select()
      .from(summary)
      .where(eq(summary.attendanceId, attendanceData[0].id))
      .limit(1);
  }

  if (event.type == "checkin" && attendanceListData[0].checkInTime) {
    // EdmondPW: if employee check in early or at the correct time
    if (attendanceListData[0].checkInTime <= attendanceData[0].checkInTime) {
      await db
        .update(attendanceList)
        .set({ attendanceStatus: "present" })
        .where(eq(attendanceList.id, attendanceListData[0].id));

      summaryData[0].present += 1;
    } // EdmondPW: if employee check in after the attendance check in time
    else {
      await db
        .update(attendanceList)
        .set({ attendanceStatus: "late" })
        .where(eq(attendanceList.id, attendanceListData[0].id));
      summaryData[0].late += 1;
    }
  }

  if (
    event.type == "checkout" &&
    attendanceListData[0].checkOutTime &&
    attendanceListData[0].checkInTime
  ) {
    console.log(
      `if checkout happened before attendance finish: ${
        attendanceData[0].checkInTime >= attendanceListData[0].checkInTime
          ? true
          : false
      }`
    );
    // EdmondPW: if employee check in early or at the correct time
    if (attendanceData[0].checkOutTime > attendanceListData[0].checkOutTime) {
      await db
        .update(attendanceList)
        .set({ attendanceStatus: "early_leave" })
        .where(eq(attendanceList.id, attendanceListData[0].id));
      summaryData[0].earlyLeave += 1;
    } // EdmondPW: if employee check Outfter the attendance check in time
  }

  // EdmondPW: update summary data
  await db.update(summary).set({
    present: summaryData[0].present,
    late: summaryData[0].late,
    earlyLeave: summaryData[0].earlyLeave,
  });
};

export const markAbsenteesAndUpdateSummary = async () => {
  const now = getTodayDateString();

  const attData = await db
    .select()
    .from(attendance)
    .where(eq(attendance.attendanceDate, now))
    .limit(1);

  if (attData.length > 0) {
    const allAttendanceToday = await db
      .select()
      .from(attendanceList)
      .where(eq(attendanceList.attendanceId, attData[0].id));

    const summaryData = await db
      .select()
      .from(summary)
      .where(eq(summary.attendanceId, attData[0].id))
      .limit(1);

    allAttendanceToday.forEach(async (att) => {
      if (att.checkInTime == null) {
        await db
          .update(attendanceList)
          .set({ attendanceStatus: "absent" })
          .where(eq(attendanceList.id, att.id));
      }
      summaryData[0].absent += 1;
    });

    // EdmondPW: update summary data
    await db.update(summary).set({
      absent: summaryData[0].absent,
    });
  } else {
    console.log("No attendance need update");
  }
};
