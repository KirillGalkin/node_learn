import { Router } from "express";
import { ensureAuthorized } from "../../middlewares/ensureAuthorized";
import { handler } from "../../utils/api";
import {
  getGroups,
  getGroupById,
  deleteGroup,
  upsertGroup,
  addUserToGroup,
} from "../controllers/groupController";

export const groupRouter = Router();

groupRouter.get("/", ensureAuthorized, handler(getGroups));
groupRouter.get("/:id", ensureAuthorized, handler(getGroupById));
groupRouter.delete("/:id", ensureAuthorized, handler(deleteGroup));
groupRouter.post("/updateGroup", ensureAuthorized, handler(upsertGroup));
groupRouter.post("/addUsersToGroup", ensureAuthorized, handler(addUserToGroup));
