"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.Category, { foreignKey: "categoryId" });
      Todo.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Todo.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      dueDate: DataTypes.DATE,
      categoryId: DataTypes.INTEGER,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
