import express from "express";
import { uploadProfile } from "../middleware/uploadProfile.middleware.js";
import { createUSer, deleteReferral, getReferralList, updateUser } from "../controllers/user.controller.js";
import JwtAuth from "../middleware/jwt.middleware.js";

export const userRoute = express.Router();

userRoute.post("/create",uploadProfile,createUSer)
userRoute.put('/update/:id', JwtAuth, updateUser);
userRoute.get('/referrals', JwtAuth, getReferralList);
userRoute.delete('/delete/:id', JwtAuth, deleteReferral);