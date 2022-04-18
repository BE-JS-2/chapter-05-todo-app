"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  return User;
};
