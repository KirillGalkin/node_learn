import { Group } from "./../entity/Group";
import { User } from "../entity/User";

class UserGroupService {
  addUserToGroup(usersIds: string[], groupId: string) {
    User.findByIds(usersIds).then((users) => {
      Group.findOne({ id: groupId }).then((group) => {
        const foundGroup = group;
        foundGroup.users = users;
        foundGroup.save();
      });
    });
  }
}

export const userGroupService = new UserGroupService();
