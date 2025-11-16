import { Router } from "express";
import validateBody from "../../utils/validator";
import { attendanceListCheckInInputFields } from "./schema.zod";
import { checkInController } from "./controller";

const router = Router();

router.post(
  "/checkin",
  validateBody(attendanceListCheckInInputFields),
  checkInController
);

export default router;
