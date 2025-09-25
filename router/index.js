import { Router } from "express";

const router = Router();
import authRouter from "./api/auth.js";
import walletRouter from "./api/wallet.js";

router.use("/auth", authRouter);
router.use("/wallet", walletRouter);

export default router;
