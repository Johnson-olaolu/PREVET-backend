'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn (
      "Transactions",
      "walletId", {
        after :"userId",
        type :Sequelize.STRING,
        allowNull : false
      }
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Transactions", "walletId")
  }
};
