import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { User } from "./entity/User";
import { users } from "../seeders/users.seed";

createConnection()
  .then(async connection => {
    const usersEntites = users.map(user => {
      const userEntity = new User(user);
      return userEntity;
    });

    await connection.manager.save(usersEntites);
  })
  .catch(error => console.log(error));
