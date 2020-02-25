import { User } from "../models";
import { IQuery } from "../models/query";
import { Op } from "sequelize";
import { IUser } from "../models/User";

type FindSettingsType = {
  where?: { login: Object };
  limit?: number;
  order: Array<any>[];
};

// add constructor to the userService with User model

class UserService {
  async findAll(query: IQuery) {
    const { search, sort = "ASC", limit = 10 } = query;
    const findSettings: FindSettingsType = { limit, order: [["login", sort]] };

    if (search) {
      findSettings.where = { login: { [Op.iLike]: `%${search}%` } };
    }

    return User.findAll(findSettings);
  }

  async findOne(id: string) {
    return await User.findOne({ where: { id } });
  }

  async delete(id: string) {
    return await User.update({ isDeleted: true }, { where: { id } });
  }

  async update(entity: IUser) {
    return await User.upsert({ ...entity });
  }
}

export const userService = new UserService();
