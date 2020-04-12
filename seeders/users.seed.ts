import * as crypto from "crypto";

const salt = crypto.randomBytes(16).toString("hex");
const createHash = password => {
  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};
export const users = Array(20)
  .fill(1)
  .map((_, i) => ({
    login: `testName${i}`,
    password: createHash("testPassword" + i),
    age: 18 + i,
    isDeleted: false
  }));
