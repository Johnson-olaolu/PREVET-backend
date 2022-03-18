'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn (
      "Users",
      "passwordResetToken", {
        after :"password",
        type :Sequelize.STRING
      }
    ),
    await queryInterface.addColumn (
      "Users",
      "tokenExpiresIn", {
        after :"verificationToken",
        type :Sequelize.DATE
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("User", "passwordResetToken")
    await queryInterface.removeColumn("User", "tokenExpiresIn")
  }
};
