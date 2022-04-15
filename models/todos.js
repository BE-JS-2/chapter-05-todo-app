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
      Todos.belongsTo(models.User, { foreignKey: "user_id"})
      Todos.belongsTo(models.Category, { foreignKey: "categori_id"})

    }
  }
  Todos.init({
    name: DataTypes.STRING,
    due_date: DataTypes.STRING,
    categori_id: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};