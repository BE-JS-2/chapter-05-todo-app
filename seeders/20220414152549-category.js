'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./masterdata/category.json', 'utf-8'))
    const category = data.map((element) => {
      return {
        name: element.name,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
     await queryInterface.bulkInsert('Categories', category, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
