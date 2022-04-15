"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const passTemplate = ["qwerty", "abcde"];
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log(passTemplate[Math.round(Math.random())]);
    const dummyData = Array.from({ length: 9 }, (_v, _index) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(
        passTemplate[Math.round(Math.random())],
        salt
      );
      return {
        name: faker.name.findName(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    console.log(dummyData);

    return queryInterface.bulkInsert('Users', dummyData);
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
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true });
    // await queryInterface.bulkDelete("Users", null, {
    //   truncate: true,
    //   restartIdentity: true,
    // });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
