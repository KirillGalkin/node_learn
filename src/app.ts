import express from "express";
import { handler } from "./utils/api";
import { UserBodySchema, validate } from "./utils/validate-user";
import { ValidationError } from "./utils/errors";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  getAutoSuggestUsers,
  upsertUser
} from "./controllers/userController";

const app = express();

app.get("/users", handler(getAllUsers));

app.get("/users/:id", handler(getUserById));

app.delete("/users/:id", handler(deleteUser));

app.get("/autosuggest", handler(getAutoSuggestUsers));

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

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
