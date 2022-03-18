'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WalletTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionType: {
        type: Sequelize.STRING
      },
      walletId: {
        type: Sequelize.INTEGER
      },
      prevBalance: {
        type: Sequelize.FLOAT
      },
      currBalance: {
        type: Sequelize.FLOAT
      },
      confirmed: {
        type: Sequelize.FLOAT
      },
      reference: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WalletTransactions');
  }
};