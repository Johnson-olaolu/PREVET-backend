'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wallet.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue : 0.00
    },
    ledgerBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue : 0.00
    },
    virtualAcctNo : {
      type: DataTypes.STRING,
      allowNull : false
    },
    virtualAcctName : {
      type : DataTypes.STRING,
      allowNull: false
    },
    virtualAcctBankName : {
      type : DataTypes.STRING,
      allowNull : false
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
    modelName: 'Wallet',
  });
  return Wallet;
};