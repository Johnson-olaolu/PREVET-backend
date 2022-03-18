'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameColumn('Users', 'token', 'verificationToken');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameColumn('Users', 'verificationToken', 'token');
  }
};
