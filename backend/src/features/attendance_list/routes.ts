import { Router } from "express";
import { getAttendanceListByAttendanceIdController } from "./controller";

const router = Router();

router.get("/:attendanceId/list", getAttendanceListByAttendanceIdController);

export default router;
