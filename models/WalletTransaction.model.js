'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WalletTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WalletTransaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    transactionType: {
      type: DataTypes.STRING
    },
    walletId: {
      type: DataTypes.INTEGER
    },
    prevBalance: {
      type: DataTypes.FLOAT
    },
    currBalance: {
      type: DataTypes.FLOAT
    },
    confirmed: {
      type: DataTypes.FLOAT
    },
    reference: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'WalletTransaction',
  });
  return WalletTransaction;
};