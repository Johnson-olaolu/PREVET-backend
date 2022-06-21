'use strict';
const {
  Model
} = require('sequelize');
const { accountTypes } = require('../utils/enums');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User)
      Account.belongsTo(models.VettingRequest, {
        as : "customer",
        foreignKey : "customerId"
      })
      Account.belongsTo(models.VettingRequest, {
        as : "vetter",
        foreignKey : "vetterId"
      })
    }
  }
  Account.init({
    accountType : {
      type : DataTypes.ENUM({
        values : accountTypes
      }),
    },
    description : {
      type : DataTypes.TEXT,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};