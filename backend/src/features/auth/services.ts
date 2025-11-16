import { comparePasswords, hashPassword } from "../../utils/auth_password";
import { UserInput } from "./schema.zod";
import { db } from "../../db";
import { users } from "../../db/schema/users.schema";
import { signToken } from "../../utils/auth_token";
import { userRole } from "../../db/schema/userRole.schema";
import { eq } from "drizzle-orm";
import { roles } from "../../db/schema/roles.schema";

type authResult = {
  ok: boolean;
  user?: object;
  token?: string;
  error?: string;
};

export async function register({
  password,
  name,
}: UserInput): Promise<authResult> {
  const hashedPassword = await hashPassword(password);
  const user = await db
    .insert(users)
    .values({ name: name, password: hashedPassword })
    .returning();

  const _roles = await db
    .select()
    .from(roles)
    .where(eq(roles.roleName, "user"));

  const role = await db
    .insert(userRole)
    .values({ roleId: _roles[0].id, userId: user[0].id })
    .returning();

  const token = signToken({ sub: user[0].id, role: role[0].id });

  return {
    ok: true,
    user: {
      id: user[0].id,
      name: user[0].name,
      role: role[0],
    },
    token,
  };
}

export async function login({
  name,
  password,
}: UserInput): Promise<authResult> {
  const user = await db.select().from(users).where(eq(users.name, name));
  if (!user) {
    return { ok: false, error: "INVALID_CREDENTIALS" };
  }
  const ok = await comparePasswords(password, user[0].password);
  if (!ok) {
    return { ok: false, error: "INVALID_CREDENTIALS" };
  }

  const role = await db
    .select()
    .from(userRole)
    .where(eq(userRole.userId, user[0].id));

  const token = signToken({ sub: user[0].id, role: role[0].roleId });
  return {
    ok: true,
    user: {
      id: user[0].id,
      name: user[0].name,
      role: role[0].roleId,
    },
    token,
  };
}
