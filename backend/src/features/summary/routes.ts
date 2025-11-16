import { Router } from "express";
import { summaryController } from "./controller";

const router = Router();

router.get("/get-summary", summaryController);

export default router;
