'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todos.belongsTo(models.users, {foreignKey: 'user_id'}),
      todos.belongsTo(models.categories, {foreignKey: 'categories_id'})
      
    }
  }
  todos.init({
    user_id: DataTypes.INTEGER,
    categories_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    due_date: {
      type: DataTypes.DATE,
      validate : {
        isAfterDate(value) {
          console.log(value);
          if (new Date() > new Date(value)) {
           
            throw new Error('Due date should be greater than today');
          }
        }
      }
    },
    completed:
    {
      type : DataTypes.ENUM,
      values: ['false','true'],
      defaultValue: 'false'
    }
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};