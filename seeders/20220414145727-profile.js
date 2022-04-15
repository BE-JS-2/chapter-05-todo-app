'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', [
      { userId: '993a7c7d-dc83-4c5a-a3b5-cabefeaa2b7e', name: 'Binar Academy', age: 10 }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
