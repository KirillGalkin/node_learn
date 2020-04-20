import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../src/entity";
import { users } from "./users.seed";
import { Group } from "../src/entity";
import { groups } from "./group.seed";
import { logger } from "../config/winston";

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
    try {
      await Promise.all([
        connection.manager.save(usersEntites),
        connection.manager.save(groupEntites),
        connection.close(),
      ]);
    } catch (err) {
      logger.error("Seed script error:", err.stack);
    }
  })
  .catch((err) => logger.error("Seed script db connection error:", err.stack));
