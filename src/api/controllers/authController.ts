import { Request, Response } from "express";
import { authService } from "../../services/authService";

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.query;
  try {
    const token = await authService.login(login, password);
    return token;
  } catch (err) {
    res.status(401).send(err);
  }
};
