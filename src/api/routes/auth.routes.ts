import { Router } from "express";
import { handler } from "../../utils/api";
import { login } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/", handler(login));
