import { db } from "../src/db"; // adjust path
import { eq } from "drizzle-orm";
import { roles } from "../src/db/schema/roles.schema";
import { users } from "../src/db/schema/users.schema";
import { userRole } from "../src/db/schema/user_role.schema";
import { attendance } from "../src/db/schema/attendance.schema";
import { randomUUID } from "crypto";
import { attendanceList } from "../src/db/schema/attendance_list.schema";
import { hashPassword } from "../src/utils/auth_password";

async function seed() {
  // EdmondPW: jika tidak ada role admin dan user di database, tambahkan ke database
  // const roleNames = ["admin", "user"];
  // for (const name of roleNames) {
  //   const exists = await db
  //     .select()
  //     .from(roles)
  //     .where(eq(roles.roleName, name))
  //     .limit(1);
  //   console.log(exists.length);
  //   if (!exists.length) {
  //     await db.insert(roles).values({ roleName: name });
  //     console.log(`Inserted role: ${name}`);
  //   }
  // }

  // // EdmondPW: query admin role
  // const adminRole = (
  //   await db.select().from(roles).where(eq(roles.roleName, "admin")).limit(1)
  // )[0];

  // // masukan admin ke database jika tidak ada.
  // const adminUserName = "admin1";
  // const password = await hashPassword("admin123");

  // let adminUser = (
  //   await db.select().from(users).where(eq(users.name, adminUserName)).limit(1)
  // )[0];

  // if (!adminUser) {
  //   adminUser = (
  //     await db
  //       .insert(users)
  //       .values({ name: adminUserName, password: password })
  //       .returning()
  //   )[0];
  //   console.log("Inserted admin user");
  // }

  // // EdmondPW: sambungkan admin user dengan admin role
  // const userRoleExists = await db
  //   .select()
  //   .from(userRole)
  //   .where(eq(userRole.userId, adminUser.id))
  //   .limit(1);

  // if (!userRoleExists.length) {
  //   await db.insert(userRole).values({
  //     roleId: adminRole.id,
  //     userId: adminUser.id,
  //   });
  //   console.log("Assigned admin role to admin user");
  // }

  // masukan attendance untuk hari ini
  const today = new Date().toISOString().substring(0, 10);

  const hoursToAdd = 8;
  const millisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
  const todayPlusEigth = new Date(new Date().getTime() + millisecondsToAdd);

  const attendanceExists = await db
    .select()
    .from(attendance)
    .where(eq(attendance.attendanceDate, today))
    .limit(1);

  if (!attendanceExists.length) {
    const newAttendance = await db
      .insert(attendance)
      .values({
        attendanceDate: today,
        checkInTime: new Date(),
        checkOutTime: todayPlusEigth,
      })
      .returning();
    console.log("Inserted attendance for today");

    // masukan semua user ke attendance list
    const allUser = await db.select().from(users);

    allUser.forEach(async (user) => {
      await db
        .insert(attendanceList)
        .values({ attendanceId: newAttendance[0].id, userId: user.id });
    });
  }

  console.log("Seed completed.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
