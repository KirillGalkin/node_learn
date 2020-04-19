import { Request, Response } from "express";
import { ApiError } from "./errors";

type Controller = (req: Request, res: Response) => Promise<any>;

export const handler = (controller: Controller) => async (
  req: Request,
  res: Response
) => {
  try {
    const result = await controller(req, res);
    res.json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.code).end();
    }
    console.log(error);
    res.status(500).end();
  }
};
