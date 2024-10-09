import express from "express";
import JwtAuth from "../middleware/jwt.middleware.js";
import { createReferralCode} from "../controllers/referal.controller.js";

export const referalRoute = express.Router();

referalRoute.post('/create', createReferralCode)