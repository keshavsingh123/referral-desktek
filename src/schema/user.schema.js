import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, unique: true, required: true },
  referralCode: { type: String },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  technology: { type: String, enum: ["PHP", "Angular", "Nodejs"] },
  profilePic: [String],
  dateOfBirth: { type: Date },
  points: { type: Number, default: 0 },
});

export const User = mongoose.model("User", userSchema);
