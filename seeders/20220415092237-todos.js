'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = JSON.parse(fs.readFileSync('./masterdata/data.json', 'utf-8'))
    const todos = data['Todos'].map((element) => {
      return {
        name: element.name,
        due_date: element.due_date,
        category: element.category,
        completed: element.completed,
        userId: element.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    
    return queryInterface.bulkInsert('Todos', todos);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Todos', null, { truncate: true, restartIdentity: true });
  }
};
