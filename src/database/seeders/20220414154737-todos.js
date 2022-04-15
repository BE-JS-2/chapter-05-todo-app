'use strict';

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
    await queryInterface.bulkInsert('todos', [
      {
        user_id: '1',
        categories_id: '1',
        title: 'Binar CH5 Exersice',
        description: 'Buat api dan dokumentasi todos',
        due_date: '2022-01-01',
        completed: 'false',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]) 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('todos',null,{truncate:true, restartIdentity:true});
    }
};
