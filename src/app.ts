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
import { login } from "./api/routers/controllers/authController";
import { checkToken } from "./middlewares/checkToken";
import cors from "cors";

const app = express();

process
  .on("unhandledRejection", (reason) => {
    console.log("Unhandled Rejection at:", reason);
  })
  .on("uncaughtException", (err) => console.log(`Caught exception: ${err}`));

app.use(bodyParser.json());
app.use(morgan("combined", { stream }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://testOrigin.com"],
  })
);

app.get("/users", checkToken, handler(getUsers));

app.get("/users/:id", checkToken, handler(getUserById));

app.delete("/users/:id", checkToken, handler(deleteUser));

app.post(
  "/updateUser",
  checkToken,
  validate(UserBodySchema),
  handler(upsertUser)
);

app.get("/groups", checkToken, handler(getGroups));

app.get("/groups/:id", checkToken, handler(getGroupById));

app.delete("/groups/:id", checkToken, handler(deleteGroup));

app.post("/updateGroup", checkToken, handler(upsertGroup));

app.post("/addUsersToGroup", checkToken, handler(addUserToGroup));

app.post("/login", handler(login));

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
