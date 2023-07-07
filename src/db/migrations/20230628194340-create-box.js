"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("box", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nameDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activeCto: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      networkTechnology: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // img: {
      //   type: Sequelize.BLOB("long"),
      //   allowNull: true,
      // },
      // observation: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("box");
  },
};
