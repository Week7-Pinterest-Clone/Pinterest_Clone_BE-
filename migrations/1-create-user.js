"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userImg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      introduce: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      snsId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
