'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'vetter',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Role', null, {});
  }
};
