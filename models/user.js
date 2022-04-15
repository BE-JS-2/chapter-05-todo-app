'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user.hasMany(models.todo, {
                foreignKey: 'userId'
            })
        }
    }
    user.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        birthdate: DataTypes.DATE
    }, {
        hooks: {
            beforeCreate: async(user) => {
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
        sequelize
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};