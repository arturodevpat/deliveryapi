"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PantallaPrincipals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo1: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      titulo2: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      titulo3: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      titulo4: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      img: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      background: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PantallaPrincipals");
  },
};
