import { date, pgTable, timestamp, serial } from "drizzle-orm/pg-core";

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  attendanceDate: date("date").defaultNow().notNull(),
  checkInTime: timestamp("check_in_time").defaultNow().notNull(),
  checkOutTime: timestamp("check_out_time").notNull(),
});
