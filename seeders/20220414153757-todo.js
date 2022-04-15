'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./masterdata/todos.json', 'utf-8'))
    const todos = data.map((element) => {
      return {
        name: element.name,
        due_date: element.due_date,
        category_id: element.category_id,
        completed: element.completed,
        user_id: element.user_id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
     await queryInterface.bulkInsert('Todos', todos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
