import argon from "argon2";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const hashedPassword = await argon.hash(this.password, 12);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparepassword = async function (password) {
  return argon.verify(this.password, password);
};
const User = mongoose.model("User", userSchema);

export default User;
