'use strict';
const {
  Model
} = require('sequelize');
const { transactionType } = require('../utils/enums');
module.exports = (sequelize, DataTypes) => {
  class WalletTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WalletTransaction.belongsTo(models.Wallet)
      WalletTransaction.hasMany(models.Transaction)
    }
  }
  WalletTransaction.init({
    transactionType : {
      type : DataTypes.ENUM({
        values : transactionType
      })
    },
    prevBalance : {
      type : DataTypes.FLOAT,
      allowNull : false,
      defaultValue : 0
    },
    currBalance : {
      type : DataTypes.FLOAT,
      allowNull : false,
      defaultValue : 0
    }, 
    confirmed : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    },
    reference : {
      type : DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'WalletTransaction',
  });
  return WalletTransaction;
};