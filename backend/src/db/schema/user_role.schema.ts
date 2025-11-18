import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { roles } from "./roles.schema";
import { users } from "./users.schema";
import { uuid } from "drizzle-orm/pg-core";

export const userRole = pgTable("user_role", {
  id: serial("id").primaryKey().notNull(),
  roleId: integer("role_id").references(() => roles.id),
  userId: uuid("user_id").references(() => users.id),
});
