'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todos.belongsTo(models.Users, { foreignKey: 'userId' })
    }
  }
  Todos.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    due_date: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};