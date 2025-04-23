'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1000,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.sequelize.query('ALTER TABLE categories AUTO_INCREMENT = 1000;');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};