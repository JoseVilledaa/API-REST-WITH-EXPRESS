import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  repassword: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password"))
    try {
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(user.password, salt);
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Fallo el hash de password");
    }
});

export const User = model("User", userSchema);
