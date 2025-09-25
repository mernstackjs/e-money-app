import { Router } from "express";

const router = Router();
import authRouter from "./api/auth.js";
import walletRouter from "./api/wallet.js";
import transactionRoute from "./api/transaction.js";

router.use("/auth", authRouter);
router.use("/wallet", walletRouter);
router.use("/", transactionRoute);

export default router;
