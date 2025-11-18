import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "../db/schema/users.schema";
import { roles } from "../db/schema/roles.schema";
import { userRole } from "../db/schema/user_role.schema";
import { attendance } from "../db/schema/attendance.schema";
import { attendanceList } from "../db/schema/attendance_list.schema";
import { summary } from "../db/schema/summary.schema";
import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserInsert = createInsertSchema(users);
export const UserSelect = createSelectSchema(users);
export const RoleInsert = createInsertSchema(roles);
export const RoleSelect = createSelectSchema(roles);
export const UserRoleInsert = createInsertSchema(userRole);
export const AttendanceInsert = createInsertSchema(attendance);
export const AttendanceSelect = createSelectSchema(attendance);
export const AttendanceListInsert = createInsertSchema(attendanceList);
export const AttendanceListSelect = createSelectSchema(attendanceList);
export const SummaryInsert = createInsertSchema(summary);
export const SummarySelect = createSelectSchema(summary);

export const LoginRequest = z
  .object({
    name: z.string().openapi({ example: "JohnDoe" }),
    password: z.string().min(6).openapi({ example: "strongpassword" }),
  })
  .openapi("LoginRequest");

export const RegisterRequest = z
  .object({
    name: z.string().min(1).openapi({ example: "JohnDoe" }),
    password: z.string().min(6).openapi({ example: "password123" }),
  })
  .openapi("RegisterRequest");

export const CheckInRequest = z
  .object({
    userId: z.uuid().openapi({ example: "uuid-of-user" }),
    attendanceId: z
      .number()
      .int()
      .nullable()
      .optional()
      .openapi({ example: 1 }),
  })
  .openapi("CheckInRequest");

export const CheckOutRequest = z
  .object({
    userId: z.uuid().openapi({ example: "uuid-of-user" }),
    attendanceId: z
      .number()
      .int()
      .nullable()
      .optional()
      .openapi({ example: 1 }),
  })
  .openapi("CheckOutRequest");

export const registry = new OpenAPIRegistry();

registry.register("UserInsert", UserInsert);
registry.register("UserSelect", UserSelect);
registry.register("RoleInsert", RoleInsert);
registry.register("RoleSelect", RoleSelect);
registry.register("UserRoleInsert", UserRoleInsert);
registry.register("AttendanceInsert", AttendanceInsert);
registry.register("AttendanceSelect", AttendanceSelect);
registry.register("AttendanceListInsert", AttendanceListInsert);
registry.register("AttendanceListSelect", AttendanceListSelect);
registry.register("SummaryInsert", SummaryInsert);
registry.register("SummarySelect", SummarySelect);
registry.register("LoginRequest", LoginRequest);
registry.register("RegisterRequest", RegisterRequest);
registry.register("CheckInRequest", CheckInRequest);
registry.register("CheckOutRequest", CheckOutRequest);

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/login",
  summary: "Login",
  request: {
    body: {
      description: "Login payload",
      content: {
        "application/json": {
          schema: LoginRequest,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: "Login response",
      content: {
        "application/json": {
          schema: z
            .object({ token: z.string().openapi({ example: "abc123token" }) })
            .openapi("LoginResponse"),
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/register",
  summary: "Register",
  request: {
    body: {
      description: "Register payload",
      content: {
        "application/json": {
          schema: RegisterRequest,
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: UserSelect, // reused from Drizzle select schema
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/attendance/checkin",
  summary: "Check in",
  request: {
    body: {
      description: "Checkin payload",
      content: {
        "application/json": {
          schema: CheckInRequest, // your Zod schema
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: "Attendance list entry created",
      content: {
        "application/json": {
          schema: AttendanceListSelect,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/attendance/checkout",
  summary: "Check out",
  request: {
    body: {
      description: "Checkout payload",
      content: {
        "application/json": {
          schema: CheckOutRequest, // your Zod schema
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: "Attendance list entry updated (checkout)",
      content: {
        "application/json": {
          schema: AttendanceListSelect,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/summary/get-summary",
  summary: "Get summary",
  responses: {
    200: {
      description: "List of summaries",
      content: {
        "application/json": {
          schema: z.array(SummarySelect).openapi("GetSummaryResponse"),
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/health",
  summary: "Healthcheck",
  responses: {
    200: {
      description: "OK",
    },
  },
});

export const openapiDoc = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Attendance API",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3000" }],
});
