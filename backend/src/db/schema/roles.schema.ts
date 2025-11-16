import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  roleName: text("role_name").notNull(),
});
