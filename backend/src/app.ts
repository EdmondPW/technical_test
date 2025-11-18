import express from "express";
import corsMiddleware from "./middleware/cors_middleware";
import CheckinRoutes from "./features/check_in/routes";
import CheckoutRoutes from "./features/check_out/routes";
import AttendanceRoute from "./features/attendance/routes";
import AttendanceListRouter from "./features/attendance_list/routes";
import SummaryRoutes from "./features/summary/routes";
import AuthRoutes from "./features/auth/routes";
import { authMiddleware } from "./middleware/require_auth_middleware";
import { checkDbConnection } from "./utils/check_db_connection";
import swaggerUi from "swagger-ui-express";
import { openapiDoc } from "./doc/openapi";

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/attendance", authMiddleware, CheckinRoutes);
app.use("/api/v1/attendance", authMiddleware, CheckoutRoutes);
app.use("/api/v1/attendance", authMiddleware, AttendanceRoute);
app.use("/api/v1/attendance-list", authMiddleware, AttendanceListRouter);
app.use("/api/v1/summary", authMiddleware, SummaryRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc));

app.get("/health", async (req, res) => {
  const healthStatus = {
    status: "UP",
    timestamp: new Date().toISOString(),
    database: await checkDbConnection(),
  };
  res.status(200).json(healthStatus);
});

export default app;
