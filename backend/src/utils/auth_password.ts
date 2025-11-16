import bcrypt from "bcrypt";
import config from "../config/config.js";

const saltRounds = config.BCRYPT_SALT_ROUNDS;

// EdmondPW: untuk hash password sebelum dimasukan ke database
export async function hashPassword(plainPassword: string): Promise<string> {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

// EdmondPW: untuk check jika password benar saat melakukan login, return promise boolean
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
