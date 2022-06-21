'use strict';
const {
  Model
} = require('sequelize');
const { transactionType } = require('../utils/enums');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.WalletTransaction)
    }
  }
  Transaction.init({
    status: {
      type: DataTypes.STRING
    },
    transactionType: {
      type: DataTypes.ENUM({
        values: transactionType
      })
    },
    transactionReference: {
      type: DataTypes.STRING
    },
    paymentReference: {
      type: DataTypes.STRING
    },
    accountDetails: {
      type: DataTypes.STRING
    },
    paidOn: {
      type: DataTypes.STRING
    },
    paymentDescription: {
      type: DataTypes.STRING
    },
    amountPaid: {
      type: DataTypes.STRING
    },
    totalPayable: {
      type: DataTypes.STRING
    },
    cardDetails: {
      type: DataTypes.STRING
    },
    paymentMethod: {
      type: DataTypes.STRING
    },
    product: {
      type: DataTypes.STRING
    },
    currency: {
      type: DataTypes.STRING
    },
    paymentStatus: {
      type: DataTypes.STRING
    },
    customer: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.STRING
    },
    reference: {
      type: DataTypes.STRING
    },
    naration: {
      type: DataTypes.STRING
    },
    bankCode: {
      type: DataTypes.STRING
    },
    accountNumber: {
      type: DataTypes.STRING
    },
    accountName: {
      type: DataTypes.STRING
    },
    bankName: {
      type: DataTypes.STRING
    },
    dateCreated: {
      type: DataTypes.DATE
    },
    fee: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};