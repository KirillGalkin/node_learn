import express from "express";
import { userCollection } from "../collection";

const getAllUsers = async (req: express.Request) => {
  const users = await userCollection.findAll();
  return users;
};
