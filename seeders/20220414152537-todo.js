"use strict";
const { faker } = require("@faker-js/faker");
const { User, Category } = require("../models");
const dayjs = require("dayjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const allUser = await User.findAll();
    const allCategory = await Category.findAll();
    const userIds = allUser.map((user) => user.id);
    const categoryIds = allCategory.map((category) => category.id);
    const usersLastId = Math.max(...userIds);
    const categoryLastId = Math.max(...categoryIds);

    const dummyData = Array.from({ length: 22 }, (_v, index) => {
      let date = dayjs().add(
        Math.floor(Math.random() * 99) + 1,
        "day"
      );
      return {
        user_id: Math.floor(Math.random() * usersLastId) + 1,
        category_id: Math.floor(Math.random() * categoryLastId) + 1,
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
        due_date: date.toDate(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Todos", dummyData);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Todos", null, {
      truncate: true,
      restartIdentity: true,
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
