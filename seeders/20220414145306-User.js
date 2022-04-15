"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Users", [
      {
        email: "syafiq@gmail.com",
        username: "syafiq",
        password: bcrypt.hashSync("syafiq", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "roikhan@gmail.com",
        username: "roikhan",
        password: bcrypt.hashSync("roikhan", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "maulana@gmail.com",
        username: "maulana",
        password: bcrypt.hashSync("maulana", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
