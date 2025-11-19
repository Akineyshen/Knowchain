import { Router } from "express";
import { tonLogin, getTonProofPayload } from "./controller";

const router = Router();

router.post("/ton-login", tonLogin);
router.get("/ton-login/payload", getTonProofPayload);

export default router;
