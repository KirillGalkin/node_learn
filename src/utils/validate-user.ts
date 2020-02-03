import express from "express";
import Joi from "@hapi/joi";
import { IUser } from "../models/user";
import { ValidationError } from "./errors";

export const UserBodySchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string()
    .alphanum()
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required(),
  isDeleted: Joi.boolean().required()
});

export const validate = (schema: Joi.ObjectSchema<IUser>) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      schema.validate(req.body);
      next();
    } catch (err) {
      next(new ValidationError(err.message));
    }
  };
};
