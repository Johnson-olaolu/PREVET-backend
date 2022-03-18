'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      transactionReference: {
        type: Sequelize.STRING
      },
      paymentReference: {
        type: Sequelize.STRING
      },
      paidOn: {
        type: Sequelize.STRING
      },
      paymentDescription: {
        type: Sequelize.STRING
      },
      destinationAccountInformation: {
        type: Sequelize.STRING
      },
      amountPaid: {
        type: Sequelize.STRING
      },
      totalPayable: {
        type: Sequelize.STRING
      },
      cardDetails: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      settlementAmount: {
        type: Sequelize.STRING
      },
      paymentStatus: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      eventType: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transactions');
  }
};