import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
    code: { type: String, required: true,unique:true },
    referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 20 }
  });
  
  export const Referral = mongoose.model('Referral', referralSchema);