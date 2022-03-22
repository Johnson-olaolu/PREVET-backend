"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("Transactions", "cardDetails", {
			type: Sequelize.STRING(1500),
		});
    await queryInterface.addColumn("Transactions", "accountDetails", {
      after : "status",
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Transactions", "product", {
			type: Sequelize.STRING(1500),
		});
    await queryInterface.changeColumn("Transactions", "customer", {
			type: Sequelize.STRING(1500),
		});
    await queryInterface.changeColumn("Transactions", "metaData", {
			type: Sequelize.STRING(1500),
		});
    await queryInterface.changeColumn("Transactions", "accountPayments", {
			type: Sequelize.STRING(1500),
		});
    await queryInterface.changeColumn("Transactions", "accountDetails", {
			type: Sequelize.STRING(1500),
		});
	},

	async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn("Transactions", "cardDetails", {
        type: Sequelize.STRING,
      });
      
      await queryInterface.changeColumn("Transactions", "product", {
        type: Sequelize.STRING,
      });
      await queryInterface.removeColumn("Transactions", "accountDetails");
      await queryInterface.changeColumn("Transactions", "customer", {
        type: Sequelize.STRING,
      });
      await queryInterface.changeColumn("Transactions", "metaData", {
        type: Sequelize.STRING,
      });
      await queryInterface.changeColumn("Transactions", "accountPayments", {
        type: Sequelize.STRING,
      });
      await queryInterface.changeColumn("Transactions", "accountDetails", {
        type: Sequelize.STRING,
      });
	},
};
