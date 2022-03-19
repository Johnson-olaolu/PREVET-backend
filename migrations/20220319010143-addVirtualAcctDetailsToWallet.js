'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn (
      "Wallets",
      "virtualAcctNo", {
        after :"userId",
        type :Sequelize.STRING,
        allowNull : false
      }
    ),
	await queryInterface.addColumn (
		"Wallets",
		"virtualAcctName", {
		  after :"virtualAcctNo",
		  type :Sequelize.STRING,
		  allowNull : false
		}
	  ),
	  await queryInterface.addColumn (
		"Wallets",
		"virtualAcctBankName", {
		  after :"virtualAcctName",
		  type :Sequelize.STRING,
		  allowNull : false
		}
	  )
  },

  async down (queryInterface, Sequelize) {
	await queryInterface.removeColumn("Wallets", "virtualAcctNo")
	await queryInterface.removeColumn("Wallets", "virtualAcctName")
	await queryInterface.removeColumn("Wallets", "virtualAcctBankName")
  }
};
