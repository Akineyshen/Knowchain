import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/auth";
import { getMe } from "./controller";

const router = Router();

router.get("/me", ensureAuthenticated, getMe);

export default router;
