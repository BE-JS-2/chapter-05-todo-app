"use strict";
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: "user_id", as: "user" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  
  User.addHook("beforeCreate", (user, options) => {
    const generatedSalt =  bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, generatedSalt);
  });
  return User;
};
