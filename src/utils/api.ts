import express from "express";
import { ApiError } from "./errors";

type Controller = (req: express.Request) => Promise<any>;

export const handler = (controller: Controller) => async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const result = await controller(req);
    res.json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.code).end();
    }
    console.log(error);
    res.status(500).end();
  }
};
