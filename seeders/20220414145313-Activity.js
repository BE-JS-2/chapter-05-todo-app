"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Activities", [
      {
        userId: 1,
        name: "Challenge 05 Binar",
        due_date: new Date("2022-04-22"),
        category: "Important",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        name: "Skripsky",
        due_date: new Date("2022-04-22"),
        category: "My Day",
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        name: "Exercise Todo APP",
        due_date: new Date("2022-04-15"),
        category: "Assign to Me",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Activities", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
