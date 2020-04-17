import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { User } from "./entity/User";
import { users } from "../seeders/users.seed";
import { Group } from "./entity/Group";
import { groups } from "../seeders/group.seed";

createConnection()
  .then(async (connection) => {
    const usersEntites = users.map((user) => {
      const userEntity = new User(user);
      return userEntity;
    });

    const groupEntites = groups.map((group) => {
      const groupEntity = new Group(group);
      return groupEntity;
    });

    await Promise.all([
      connection.manager.save(usersEntites),
      connection.manager.save(groupEntites),
    ]);
  })
  .catch((error) => console.log(error));
