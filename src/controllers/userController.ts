import express from "express";
import { userCollection } from "../collection";
import { IQuery } from "../models/query";

export const getAllUsers = async (req: express.Request) => {
  const users = await userCollection.findAll();
  return users;
};

export const getUserById = async (req: express.Request) => {
  const id = req.params.id;
  const user = await userCollection.findOne(id);
  return user;
};

export const deleteUser = async (req: express.Request) => {
  const id = req.params.id;
  const user = await userCollection.delete(id);
  return user;
};

export const getAutoSuggestUsers = async (req: express.Request) => {
  const { loginSubstring, limit = 10 } = req.query;
  const query: IQuery = {
    filter: { search: loginSubstring },
    sort: { direction: "asc" },
    limit
  };
  const users = await userCollection.findAll(query);
  return users;
};

export const upsertUser = async (req: express.Request) => {
  // upsert implementation
};
