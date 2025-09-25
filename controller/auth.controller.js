import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Wallet from "../model/Wallet.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Fill all fields",
      });
    }
    const isFound = await User.findOne({ email });

    if (isFound)
      return res.status(400).json({
        message: "Already is Register this user",
      });
    const user = new User({ name, email, password });
    await user.save();

    const wallet = new Wallet({ userId: user._id });
    await wallet.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Fill all fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparepassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
