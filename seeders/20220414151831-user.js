'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./masterdata/user.json', 'utf-8'))
    const users = data.map((element) => {
      return {
        name: element.name,
        password: element.password,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
     await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
