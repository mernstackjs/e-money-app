import { Router } from "express";
import { login, register } from "../../controller/auth.controller.js";
import User from "../../model/user.js";
import { authentication } from "../../middleware/authentication.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({
        message: "Don't found this user",
      });
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Transaction failed", error: err.message });
  }
});
export default router;
