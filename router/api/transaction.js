import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import {
  getTransactions,
  sendMoney,
} from "../../controller/transaction.controller.js";

const router = Router();

router.post("/send", authentication, sendMoney);
router.get("/transactions", authentication, getTransactions);
export default router;
