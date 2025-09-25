import { Router } from "express";
import { getBalance, topUp } from "../../controller/wallet.controller.js";
import { authentication } from "../../middleware/authentication.js";

const router = Router();

router.get("/balance", authentication, getBalance);
router.get("/topup", authentication, topUp);
export default router;
