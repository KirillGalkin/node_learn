import express from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { userRouter } from "./api/routes/user.routes";
import { ValidationError } from "./utils/errors";
import { stream, logger } from "../config/winston";
import { groupRouter } from "./api/routes/group.routes";
import { authRouter } from "./api/routes/auth.routes";

export const app = express();

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

app.use(
  (
    error: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error instanceof ValidationError) {
      return res.status(422).json({});
    }
    return res.status(500).end();
  }
);
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/login", authRouter);

createConnection()
  .then(() => {
    app.listen(3000, () => {
      logger.info("Example app listening on port 3000!");
    });
  })
  .catch((err) => logger.error("DB connection error:", err.stack));
