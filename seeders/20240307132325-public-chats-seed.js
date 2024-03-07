"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersIdArray = await queryInterface.sequelize.query(
      `SELECT id FROM Users;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
  },

  async down(queryInterface, Sequelize) {},
};
