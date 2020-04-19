import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { secret } from "../../config/auth";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["x-access-token"];

  try {
    jwt.verify(token, secret);
  } catch (err) {
    return res.status(403).send(err.message);
  }

  next();
};
