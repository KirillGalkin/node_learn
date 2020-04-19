import { Request, Response } from "express";
import { Group } from "../../../entity/Group";
import { IQuery } from "../../../models/query";
import { groupService } from "../../../services/groupService";

export const getGroups = async (req: Request, res: Response) => {
  const { search, limit, sort } = req.query;
  const query: IQuery = {
    search,
    sort,
    limit,
  };
  try {
    const groups = await groupService.findAll(query);
    return groups;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const group = await groupService.findOne(id);
    return group;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const group = await groupService.delete(id);
    return group;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const upsertGroup = async (req: Request, res: Response) => {
  const entity: Group = req.body;
  try {
    const result = await groupService.update(entity);
    return result;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
