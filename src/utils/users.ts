import uuid from "uuid/v4";
import crypto from "crypto";

import { IUser } from "../models/user";

const salt = crypto.randomBytes(16).toString("hex");

const createHash = (password: string) => {
  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};

export const createUsers = (count: number): IUser[] => {
  return Array(count)
    .fill(1)
    .map((el, i) => ({
      id: uuid(),
      login: `testName${i}`,
      password: createHash("testPassword" + i),
      age: 18 + i,
      isDeleted: false
    }));
};
