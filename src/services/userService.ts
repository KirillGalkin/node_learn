import { User } from "../entity/User";
import { IQuery } from "../models/query";
import { Like, FindOperator } from "typeorm";

type FindSettingsType = {
  order: { login: "ASC" | "DESC" };
  take: number;
  where?: { login: FindOperator<string> };
};

class UserService {
  async findAll(query: IQuery) {
    const { search, sort = "ASC", limit = 10 } = query;
    const findSettings: FindSettingsType = {
      order: { login: sort },
      take: limit
    };

    if (search) {
      findSettings.where = { login: Like(`%${search}%`) };
    }

    return User.find(findSettings);
  }

  async findOne(id: string) {
    return await User.findOne({ where: { id } });
  }

  async delete(id: string) {
    return await User.update({ id }, { isDeleted: true });
  }

  async update(entity: User) {
    return await User.save(entity);
  }
}

export const userService = new UserService();
