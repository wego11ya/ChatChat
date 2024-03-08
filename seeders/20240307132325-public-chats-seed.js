"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const messages = [];
    for (let i = 0; i < 20; i++) {
      const user_id = users[Math.floor(Math.random() * users.length)].id;
      messages.push({
        user_id,
        message: faker.lorem.sentence(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("Public_Messages", messages, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Public_Messages", null, {});
  },
};
