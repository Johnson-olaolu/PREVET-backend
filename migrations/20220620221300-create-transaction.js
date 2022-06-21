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
      status: {
        type: Sequelize.STRING
      },
      transactionType: {
        type: Sequelize.STRING
      },
      transactionReference: {
        type: Sequelize.STRING
      },
      paymentReference: {
        type: Sequelize.STRING
      },
      accountDetails: {
        type: Sequelize.STRING
      },
      paidOn: {
        type: Sequelize.DATE
      },
      paymentDescription: {
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
      product: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      paymentStatus: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      reference: {
        type: Sequelize.STRING
      },
      naration: {
        type: Sequelize.STRING
      },
      bankCode: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      accountName: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      dateCreated: {
        type: Sequelize.DATE
      },
      fee: {
        type: Sequelize.FLOAT
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