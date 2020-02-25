require("dotenv").config();

const { env } = process;

module.exports = {
  development: {
    username: "pglearn",
    password: "1234",
    database: "database_development",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: env.PG_DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.PG_DB_NAME,
    host: env.PG_DB_HOST,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: env.PG_DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.PG_DB_NAME,
    host: env.PG_DB_HOST,
    dialect: "postgres",
    operatorsAliases: false
  }
};
