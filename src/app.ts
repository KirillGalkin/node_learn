import express from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import { handler } from "./utils/api";
import { UserBodySchema, validate } from "./utils/validate-user";
import { ValidationError } from "./utils/errors";
import {
  getUsers,
  getUserById,
  deleteUser,
  upsertUser,
  addUserToGroup,
} from "./api/routers/controllers/userController";
import {
  getGroups,
  getGroupById,
  deleteGroup,
  upsertGroup,
} from "./api/routers/controllers/groupController";
import morgan from "morgan";
import { stream, logger } from "../config/winston";

const app = express();

process
  .on("unhandledRejection", (reason) => {
    console.log("Unhandled Rejection at:", reason);
  })
  .on("uncaughtException", (err) => console.log(`Caught exception: ${err}`));

app.use(bodyParser.json());
app.use(morgan("combined", { stream }));

app.get("/users", handler(getUsers));

app.get("/users/:id", handler(getUserById));

app.delete("/users/:id", handler(deleteUser));

app.post("/updateUser", validate(UserBodySchema), handler(upsertUser));

app.get("/groups", handler(getGroups));

app.get("/groups/:id", handler(getGroupById));

app.delete("/groups/:id", handler(deleteGroup));

app.post("/updateGroup", handler(upsertGroup));

app.post("/addUsersToGroup", handler(addUserToGroup));

app.use(
  (
    error: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error instanceof ValidationError) {
      res.status(422).json({});
    }
    res.status(500).end();
  }
);

createConnection()
  .then((_) => {
    app.listen(3000, function() {
      console.log("Example app listening on port 3000!");
    });
  })
  .catch((err) => logger.error("App starting error:", err.stack));
