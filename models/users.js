'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Todos, { foreignKey: 'userId', as: 'Todos' })
    }
  }
  Users.init({
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.addHook('beforeCreate', (users, options) => {
    // enkripsi / hash si password
    const salt = bcrypt.genSaltSync(10);
    users.password = bcrypt.hashSync(users.password, salt);
    // users.password = hash;
  });
  return Users;
};