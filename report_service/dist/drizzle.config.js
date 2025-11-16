"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const config_1 = __importDefault(require("./src/config/config"));
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    schema: "./src/db/schema/*.schema.ts",
    out: "./src/db/migration",
    dbCredentials: {
        url: config_1.default.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
