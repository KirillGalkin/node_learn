import express from "express";
import Joi from "@hapi/joi";
import { ValidationError } from "./errors";
import { User } from "../entity/User";

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
  isDeleted: Joi.boolean().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date()
});

export const validate = (schema: Joi.ObjectSchema<User>) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      next();
    } catch (err) {
      next(new ValidationError(err.message));
    }
  };
};
