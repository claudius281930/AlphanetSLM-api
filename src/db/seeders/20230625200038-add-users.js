"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user",
      [
        {
          name: "Claudio Lima",
          email: "claudio@gmail.com",
          password: "123456",
          isBetaMember: false,
        },
        {
          name: "Carlos Moraes",
          email: "moraes123@gmail.com",
          password: "@lpha123",
          isBetaMember: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "user", 
      /*null,*/ 
      {
        [Op.or]:[
          {
            name:"claudio"
          },
          {
            name: "Carlos Moraes"
          }
        ]});
  },
};
