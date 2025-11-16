import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { attendance } from "./attendance.schema";
import { integer } from "drizzle-orm/pg-core";

export const summary = pgTable("summary", {
  id: uuid("id").primaryKey().defaultRandom(),
  attendanceId: integer("attendance_id").references(() => attendance.id),
  present: integer("present").default(0).notNull(),
  late: integer("late").default(0).notNull(),
  earlyLeave: integer("early_leave").default(0).notNull(),
  absent: integer("absent").default(0).notNull(),
});
