"use strict";
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      Array.from({ length: 10 }, (_, index) => {
        return {
          name: faker.person.firstName(),
          email: `user${index + 1}@example.com`,
          password: bcrypt.hashSync("12345678", 10),
          avatar: faker.image.avatar(),
          introduction: faker.lorem.paragraph(2),
          created_at: new Date(),
          updated_at: new Date(),
        };
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
