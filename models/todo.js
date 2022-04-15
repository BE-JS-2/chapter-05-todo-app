'use strict';
const {
  Model
} = require('sequelize');
const id = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Todo.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['important', 'daily', '0', '1']
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`
      }
    },
    isCompleted: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['yes', 'no', '0', '1']
    }
  }, {
    hooks: {
      beforeCreate: (todo, op) => {
        todo.id = id.randomUUID()
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};