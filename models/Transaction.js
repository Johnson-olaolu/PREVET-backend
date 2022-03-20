"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Transaction.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			walletId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
			},
			transactionReference: {
				type: DataTypes.STRING,
			},
			paymentReference: {
				type: DataTypes.STRING,
			},
			paidOn: {
				type: DataTypes.STRING,
			},
			paymentDescription: {
				type: DataTypes.STRING,
			},
			destinationAccountInformation: {
				type: DataTypes.STRING,
			},
			amountPaid: {
				type: DataTypes.STRING,
			},
			totalPayable: {
				type: DataTypes.STRING,
			},
			cardDetails: {
				type: DataTypes.STRING,
			},
			paymentMethod: {
				type: DataTypes.STRING,
			},
			currency: {
				type: DataTypes.STRING,
			},
			settlementAmount: {
				type: DataTypes.STRING,
			},
			paymentStatus: {
				type: DataTypes.STRING,
			},
			customer: {
				type: DataTypes.STRING,
			},
			eventType: {
				type: DataTypes.STRING,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};
