import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/auth";
import { getMe, addTokensToUser } from "./controller";

const router = Router();

router.get("/me", ensureAuthenticated, getMe);
router.put("/:userId/tokens", ensureAuthenticated, addTokensToUser);

export default router;
