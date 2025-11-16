import { defineConfig } from "drizzle-kit";
import config from "./src/config/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*.schema.ts",
  out: "./src/db/migration",
  dbCredentials: {
    url: config.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
