import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import { sendMoney } from "../../controller/transaction.controller.js";

const router = Router();

router.post("/send", authentication, sendMoney);
export default router;
