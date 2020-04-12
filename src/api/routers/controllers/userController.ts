import express from "express";
import { IQuery } from "../../../models/query";
import { userService } from "../../../services/userService";
import { User } from "../../../entity/User";

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
  const entity: User = req.body;
  const result = await userService.update(entity);
  return result;
};
