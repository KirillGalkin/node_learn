const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN
    },
    {
      // Other model options go here
      modelName: "user"
    }
  );

  User.sync({ force: true });

  return User;
};
