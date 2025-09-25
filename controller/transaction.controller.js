import Transaction from "../model/Transaction.js";
import User from "../model/user.js";
import Wallet from "../model/Wallet.js";

export const sendMoney = async (req, res) => {
  const { toEmail, amount } = req.body;

  // Validate input
  if (!toEmail || !amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid recipient or amount" });
  }

  try {
    const senderWallet = await Wallet.findOne({
      userId: req.user._id,
    });
    if (!senderWallet) throw new Error("Sender wallet not found");

    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const recipient = await User.findOne({ email: toEmail });
    if (!recipient) {
      return res.status(400).json({ message: "Recipient not found" });
    }

    const recipientWallet = await Wallet.findOne({
      userId: recipient._id,
    });
    if (!recipientWallet) throw new Error("Recipient wallet not found");

    senderWallet.balance -= amount;
    recipientWallet.balance += amount;

    await senderWallet.save();
    await recipientWallet.save();

    const tx = new Transaction({
      from: req.user._id,
      to: recipient._id,
      amount,
      createdAt: new Date(),
    });
    await tx.save();

    res.json({
      message: "Transaction successful",
      senderBalance: senderWallet.balance,
      recipientBalance: recipientWallet.balance,
    });
  } catch (err) {
    res.status(500).json({ message: "Transaction failed", error: err.message });
  }
};
