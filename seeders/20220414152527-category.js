'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = ['Important', 'Regular', 'Urgent']
    const dummyData = Array.from({length: categories.length}, (_v, index)=>{
      return {
        name: categories[index],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    await queryInterface.bulkInsert('Categories', dummyData);
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
