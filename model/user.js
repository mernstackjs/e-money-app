import argon from "argon2";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await argon.hash(this.password);

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparepassword = async function (password) {
  return argon.verify(this.password, password);
};
const User = mongoose.model("User", userSchema);

export default User;
