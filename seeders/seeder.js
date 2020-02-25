"use strict";
const uuid = require("uuid");
const crypto = require("crypto");

const salt = crypto.randomBytes(16).toString("hex");
const createHash = password => {
  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};
const users = Array(20)
  .fill(1)
  .map((el, i) => ({
    id: uuid(),
    login: `testName${i}`,
    password: createHash("testPassword" + i),
    age: 18 + i,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
