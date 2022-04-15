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
      // define association here
      Todo.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
      Todo.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' })
    }
  }
  Todo.init({
    name: DataTypes.STRING,
    due_date: DataTypes.DATE,
    category_id: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};