import { pgTable, text, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { attendance } from "./attendance.schema";

export const attendanceList = pgTable("attendance_list", {
  id: uuid("id").primaryKey().defaultRandom(),
  attendanceId: integer("attendance_id")
    .references(() => attendance.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  attendanceStatus: text("attendance_status").default("no-status").notNull(),
});
