import { Router } from "express";

const router = Router();
import authRouter from "./api/auth.js";

router.use("/auth", authRouter);

export default router;
