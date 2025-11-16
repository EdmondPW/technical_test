import { Router } from "express";
import validateBody from "../../utils/validator";
import { attendanceListCheckOutInputFields } from "./schema.zod";
import { checkOutController } from "./controller";

const router = Router();

router.post(
  "/checkout",
  validateBody(attendanceListCheckOutInputFields),
  checkOutController
);

export default router;
