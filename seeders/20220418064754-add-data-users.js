"use strict";
const { loadMasterData } = require("../utils/loadMasterData");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = loadMasterData("user.json");

    const user = data.map((element) => {
      return {
        username: element.name,
        gender: element.gender,
        birthdate: element.birthdate,
        password: element.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Users", user, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
