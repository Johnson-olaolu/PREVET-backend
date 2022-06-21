'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type : Sequelize.STRING,
        allowNull : false
      },
      lastName : {
        type : Sequelize.STRING,
        allowNull : false
      },
      email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      phoneNum : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      userName : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      state : {
        type : Sequelize.STRING
      },
      localGovernment : {
        type : Sequelize.STRING
      },
      address : {
        type : Sequelize.TEXT,
        allowNull : false
      },
      password : {
        type : Sequelize.STRING,
        allowNull : false
      }, 
      verificationToken : {
        type : Sequelize.STRING,
        allowNull : false
      },
      tokenExpiresIn : {
        type : Sequelize.DATE
      },
      passwordResetToken : {
        type : Sequelize.STRING
      },
      isVerified : {
        type : Sequelize.BOOLEAN ,
        allowNull : false,
        defaultValue : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};