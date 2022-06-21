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
      Wallet.belongsTo(models.User)
      Wallet.hasMany(models.WalletTransaction)
    }
  }
  Wallet.init({
    virtualAccountNo: {
      type: DataTypes.STRING,
    },
    virtualAccountName: {
      type: DataTypes.STRING
    },
    virtualAccountBankName: {
      type: DataTypes.STRING
    }, 
    balance : {
      type : DataTypes.FLOAT,
      allowNull : false,
      defaultValue : 0
    },
    ledgerBalance : {
      type : DataTypes.FLOAT,
      allowNull : false,
      defaultValue : 0
    }
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};