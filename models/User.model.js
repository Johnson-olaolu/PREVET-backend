'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Account)
      User.belongsTo(models.Role)
      User.hasOne(models.Wallet)
    }
  }
  User.init({
    firstName: {
      type : DataTypes.STRING,
      allowNull : false
    },
    lastName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    phoneNum : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    userName : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    state : {
      type : DataTypes.STRING
    },
    localGovernment : {
      type : DataTypes.STRING
    },
    address : {
      type : DataTypes.TEXT,
      allowNull : false
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false
    }, 
    verificationToken : {
      type : DataTypes.STRING,
      allowNull : false
    },
    tokenExpiresIn : {
      type : DataTypes.DATE
    },
    passwordResetToken : {
      type : DataTypes.STRING
    },
    isVerified : {
      type : DataTypes.BOOLEAN ,
      allowNull : false,
      defaultValue : false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};