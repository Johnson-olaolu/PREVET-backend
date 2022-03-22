'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("WalletTransactions", "confirmed", {
      type : Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("WalletTransactions", "confirmed", {
      type : Sequelize.FLOAT
    })
  }
};
