"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("books", "author_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'authors',
          key: 'id'
        },
        onDelete: "CASCADE"
      })
      await queryInterface.addColumn("books", "category_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: "CASCADE"
      })


      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("books", "author_id");
      await queryInterface.removeColumn("books", "category_id");
      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }

    await queryInterface.dropTable("relations");
  },
};
