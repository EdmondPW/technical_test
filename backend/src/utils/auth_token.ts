import jwt, { Secret } from "jsonwebtoken";
import config from "../config/config.js";

export function signToken(payload: object): string {
  console.log("expire in:" + config.JWT_EXPIRES_IN);
  const exp_ = config.JWT_EXPIRES_IN || "30m";
  const secret: Secret = config.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: "30m",
  });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, config.JWT_SECRET);
}
