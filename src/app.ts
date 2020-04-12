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
  upsertUser
} from "./api/routers/controllers/userController";

const app = express();

app.use(bodyParser.json());

app.get("/users", handler(getUsers));

app.get("/users/:id", handler(getUserById));

app.delete("/users/:id", handler(deleteUser));

app.post("/updateUser", validate(UserBodySchema), handler(upsertUser));

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

createConnection().then(_ => {
  app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
  });
});
