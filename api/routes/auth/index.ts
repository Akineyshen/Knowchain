import { Router } from "express";
import { tonLogin } from "./controller";

const router = Router();

router.post("/ton-login", tonLogin);

export default router;
