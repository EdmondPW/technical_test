import { Router } from "express";
import {
  getAllAttendanceController,
  getAttendanceByIdController,
  getTodayAttendanceController,
} from "./controller";

const router = Router();

router.get("/get-all-attendance", getAllAttendanceController);
router.get("/today", getTodayAttendanceController);
router.get("/get-attendance-by-id/:id", getAttendanceByIdController);

export default router;
