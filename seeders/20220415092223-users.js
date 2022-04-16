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
    const users = data['Users'].map((element) => {
      return {
        fullname: element.fullname,
        username: element.username,
        password: element.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    
    return queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true });
  }
};
