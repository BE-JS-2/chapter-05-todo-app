"use strict";
const { loadMasterData } = require("../utils/loadMasterData");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = loadMasterData("todo.json");

    const todos = data.map((element) => {
      return {
        name: element.name,
        description: element.description,
        dueDate: element.dueDate,
        completed: element.completed,
        categoryId: element.categoryId,
        userId: element.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Todos", todos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Todos", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
