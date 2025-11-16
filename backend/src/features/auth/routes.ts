import { Router } from "express";
import validateBody from "../../utils/validator";
import { userInputFields } from "./schema.zod";
import { loginController, registerController } from "./controller";

const router = Router();

router.post("/login", validateBody(userInputFields), loginController);
router.post("/register", validateBody(userInputFields), registerController);

export default router;
