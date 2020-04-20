import { Router } from "express";
import { ensureAuthorized } from "../../middlewares/ensureAuthorized";
import { handler } from "../../utils/api";
import {
  getUsers,
  getUserById,
  deleteUser,
  upsertUser,
} from "../controllers/userController";
import { validate, UserBodySchema } from "../../utils/validate-user";

export const userRouter = Router();

userRouter.get("/", ensureAuthorized, handler(getUsers));
userRouter.get("/:id", ensureAuthorized, handler(getUserById));
userRouter.delete("/:id", ensureAuthorized, handler(deleteUser));
userRouter.post(
  "/updateUser",
  ensureAuthorized,
  validate(UserBodySchema),
  handler(upsertUser)
);
