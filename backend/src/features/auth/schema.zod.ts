import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { users } from "../../db/schema/users.schema";

const userSchema = createInsertSchema(users);

export const userInputFields = userSchema
  .pick({
    name: true,
    password: true,
  })
  .required({
    name: true,
    password: true,
  });

export type UserInput = z.infer<typeof userInputFields>;
