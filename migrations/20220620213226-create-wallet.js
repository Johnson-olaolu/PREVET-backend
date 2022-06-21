'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      virtualAccountNo: {
        type: Sequelize.STRING,
      },
      virtualAccountName: {
        type: Sequelize.STRING
      },
      virtualAccountBankName: {
        type: Sequelize.STRING
      }, 
      balance : {
        type : Sequelize.FLOAT,
        allowNull : false,
        defaultValue : 0
      },
      ledgerBalance : {
        type : Sequelize.FLOAT,
        allowNull : false,
        defaultValue : 0
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
    await queryInterface.dropTable('Wallets');
  }
};