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
   await queryInterface.bulkInsert('categories', [
     {
       name: 'Tugas',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Olahraga',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rekreasi',
      createdAt: new Date(),
      updatedAt: new Date()
    },


   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('categories',null,{truncate:true, restartIdentity:true});

  }
};
