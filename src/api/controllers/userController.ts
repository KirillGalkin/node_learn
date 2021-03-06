import { Request, Response } from "express";
import { IQuery } from "../../types/query";
import { userService } from "../../services/userService";
import { User } from "../../entity";

export const getUsers = async (req: Request, res: Response) => {
  const { search, limit, sort } = req.query;
  const query: IQuery = {
    search,
    sort,
    limit,
  };
  try {
    const users = await userService.findAll(query);
    return users;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await userService.findOne(id);
    return user;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await userService.delete(id);
    return user;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const upsertUser = async (req: Request, res: Response) => {
  const entity: User = req.body;
  try {
    const result = await userService.update(entity);
    return result;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
