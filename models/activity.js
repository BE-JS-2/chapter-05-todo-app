"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.User, { foreignKey: "userId", as: "User" });
    }
  }
  Activity.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      due_date: DataTypes.DATE,
      category: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  Activity.addHook("beforeCreate", (user, options) => {
    user.due_date = new Date(user.due_date);
  });
  return Activity;
};
