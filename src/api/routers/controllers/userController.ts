import express from "express";
import { IQuery } from "../../../models/query";
import { IUser } from "../../../models/user";
import { userService } from "../../../services/userService";

export const getUsers = async (req: express.Request) => {
  const { search, limit, sort } = req.query;
  const query: IQuery = {
    search,
    sort,
    limit
  };
  const users = await userService.findAll(query);
  return users;
};

export const getUserById = async (req: express.Request) => {
  const id = req.params.id;
  const user = await userService.findOne(id);
  return user;
};

export const deleteUser = async (req: express.Request) => {
  const id = req.params.id;
  const user = await userService.delete(id);
  return user;
};

export const upsertUser = async (req: express.Request) => {
  const entity: IUser = req.body;
  const result = await userService.update(entity);
  return result;
};
