'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { id: '993a7c7d-dc83-4c5a-a3b5-cabefeaa2b7e', username: 'binarian', password: bcrypt.hashSync('binar123', 10) }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
