import dotenv from "dotenv";

dotenv.config();

interface Config {
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  REDIS_URL: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_SALT_ROUNDS: number;
  DOCUMENTATION_PORT: number;
}
// EdmondPW:
// untuk check jika env variable undefind atau sudah di set
// dan set default variable jika belum di set di .env

const getEnvVar = (key: keyof Config, defaultValue?: any): string => {
  const val = process.env[key];
  if (val === undefined || val === "") {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing required env var: ${key}`);
  }
  return val;
};

const config: Config = {
  NODE_ENV: getEnvVar("NODE_ENV") as "development" | "production",
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  REDIS_URL: getEnvVar("REDIS_URL"),
  PORT: Number(getEnvVar("PORT", "3000")),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  JWT_EXPIRES_IN: getEnvVar("JWT_EXPIRES_IN", "15m"),
  BCRYPT_SALT_ROUNDS: Number(getEnvVar("BCRYPT_SALT_ROUNDS", "10")),
  DOCUMENTATION_PORT: Number(getEnvVar("DOCUMENTATION_PORT", "3001")),
};

export default config;
