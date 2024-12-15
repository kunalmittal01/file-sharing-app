import express from "express";
import { verifyUser } from "../controllers/auth.js";
const authRouter = express.Router();

authRouter.post("/verify-token", verifyUser);

export default authRouter;