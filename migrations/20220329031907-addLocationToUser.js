'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn(
    "Users",
    "state", {
      after : "userName",
      type : Sequelize.STRING
    }
  ),
  await queryInterface.addColumn(
    "Users",
    "localGovernment", {
      after : "state",
      type : Sequelize.STRING
    }
  )
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.removeColumn("Users", "state")
  await queryInterface.removeColumn("Users", "localGovernment")
  }
};
