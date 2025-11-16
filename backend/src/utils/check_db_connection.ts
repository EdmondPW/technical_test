import { sql } from "drizzle-orm";
import { db } from "../db";

export async function checkDbConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connection successful!");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    // Handle the error (e.g., exit the application)
    return false;
  }
}
