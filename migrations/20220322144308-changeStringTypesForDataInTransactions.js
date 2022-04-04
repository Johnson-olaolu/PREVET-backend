"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("Transactions", "cardDetails", {
			type: Sequelize.TEXT,
		});
    await queryInterface.addColumn("Transactions", "accountPayments", {
      after : "status",
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Transactions", "product", {
      after : "accountPayments",
			type: Sequelize.TEXT,
		});
    await queryInterface.addColumn("Transactions", "metaData", {
      after : "product",
			type: Sequelize.TEXT
		});
    await queryInterface.changeColumn("Transactions", "customer", {
			type: Sequelize.TEXT,
		});
    await queryInterface.addColumn("Transactions", "accountDetails", {
      after : "metaData",
			type: Sequelize.TEXT,
		});
	},

	async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn("Transactions", "cardDetails", {
        type: Sequelize.STRING,
      });
      
      await queryInterface.removeColumn("Transactions", "product");
      await queryInterface.removeColumn("Transactions", "accountDetails");
      await queryInterface.removeColumn("Transactions", "customer");
      await queryInterface.removeColumn("Transactions", "metaData");
      await queryInterface.removeColumn("Transactions", "accountPayments");
	},
};
