"use strict";

const { loadMasterData } = require("../utils/loadMasterData");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = loadMasterData("category.json");

    const categories = data.map((element) => {
      return {
        name: element.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
