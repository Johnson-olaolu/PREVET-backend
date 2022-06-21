'use strict';
const {
  Model
} = require('sequelize');
const { vettingStatus } = require('../utils/enums');
module.exports = (sequelize, DataTypes) => {
  class VettingRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VettingRequest.hasMany(models.Account)
    }
  }
  VettingRequest.init({
    title : {
      type : DataTypes.STRING,
      allowNull : false
    },
    description : {
      type : DataTypes.TEXT,
      allowNull : false
    },
    productSpecification : {
      type : DataTypes.STRING,
    },
    productLink : {
      type : DataTypes.STRING
    },
    productPhoneNum : {
      type : DataTypes.STRING
    },
    productAddress : {
      type : DataTypes.STRING
    },
    productImages : {
      type : DataTypes.STRING
    },
    status : {
      type : DataTypes.ENUM({
        values : vettingStatus
      })
    }
  }, {
    sequelize,
    modelName: 'VettingRequest',
  });
  return VettingRequest;
};