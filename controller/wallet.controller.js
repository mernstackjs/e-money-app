import Wallet from "../model/Wallet.js";

export const getBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });

    res.json({ balance: wallet.balance });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

export const topUp = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Invalid top-up amount" });
    }

    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    wallet.balance += amount;
    await wallet.save();

    res.json({
      message: "Top-up successful",
      balance: wallet.balance,
    });
  } catch (err) {
    console.error("Top-up error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
