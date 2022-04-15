'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.Category, {foreignKey: 'category_id', as: 'category'});
      Todo.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    }
  }
  Todo.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};