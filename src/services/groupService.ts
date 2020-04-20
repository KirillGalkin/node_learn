import { FindOperator, Like } from "typeorm";
import { IQuery } from "../types/query";
import { Group } from "../entity";

type FindSettingsType = {
  order: { name: "ASC" | "DESC" };
  take: number;
  where?: { name: FindOperator<string> };
};

class GroupService {
  async findAll(query: IQuery) {
    const { search, sort = "ASC", limit = 10 } = query;
    const findSettings: FindSettingsType = {
      order: { name: sort },
      take: limit,
    };

    if (search) {
      findSettings.where = { name: Like(`%${search}%`) };
    }

    return Group.find(findSettings);
  }

  async findOne(id: string) {
    return await Group.findOne({ where: { id } });
  }

  async delete(id: string) {
    return await Group.delete({ id });
  }

  async update(entity: Group) {
    return await Group.save(entity);
  }
}

export const groupService = new GroupService();
