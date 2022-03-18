'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn (
      "Users",
      "token", {
        after :"address",
        type :Sequelize.STRING
      }
    ),
    await queryInterface.addColumn (
      "Users",
      "isVerified", {
        after :"token",
        type :Sequelize.STRING,
        defaultValue : false
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("User", "token")
    await queryInterface.removeColumn("User", "isVerified")
  }
};
