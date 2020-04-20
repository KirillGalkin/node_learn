import { Group } from "./../entity";
import { User } from "../entity";

class UserGroupService {
  async addUserToGroup(usersIds: string[], groupId: string) {
    const users = await User.findByIds(usersIds);
    const group = await Group.findOne({ id: groupId });
    group.users = users;
    await group.save();
  }
}

export const userGroupService = new UserGroupService();
