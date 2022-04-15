'use strict';
const {
  Model
} = require('sequelize');
const id = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'userId', as: 'todos' });
      User.hasOne(models.Profile, { foreignKey: 'userId', as: 'profile' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCreate(user, op) {
        user.id = id.randomUUID()
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};