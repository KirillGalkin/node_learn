import { Request, Response } from "express";
import { Group } from "../../entity";
import { IQuery } from "../../types/query";
import { groupService } from "../../services/groupService";
import { userGroupService } from "../../services/userGroupService";

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
    return await groupService.delete(id);
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

export const addUserToGroup = async (req: Request, res: Response) => {
  const userIds: string[] = req.body.users;
  const groupId: string = req.body.group;
  try {
    const result = await userGroupService.addUserToGroup(userIds, groupId);
    return result;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
