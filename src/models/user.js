import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["super_admin", "admin"], default: "admin" },
  refreshToken: { type: String },
});

export const User = model("User", userSchema);
