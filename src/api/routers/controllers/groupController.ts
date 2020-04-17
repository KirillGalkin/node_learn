import express from "express";
import { Group } from "../../../entity/Group";
import { IQuery } from "../../../models/query";
import { groupService } from "../../../services/groupService";

export const getGroups = async (req: express.Request) => {
  const { search, limit, sort } = req.query;
  const query: IQuery = {
    search,
    sort,
    limit,
  };
  const groups = await groupService.findAll(query);
  return groups;
};

export const getGroupById = async (req: express.Request) => {
  const id = req.params.id;
  const group = await groupService.findOne(id);
  return group;
};

export const deleteGroup = async (req: express.Request) => {
  const id = req.params.id;
  const group = await groupService.delete(id);
  return group;
};

export const upsertGroup = async (req: express.Request) => {
  const entity: Group = req.body;
  const result = await groupService.update(entity);
  return result;
};
