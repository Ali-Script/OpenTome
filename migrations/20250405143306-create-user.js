'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1000
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 255],
            msg: "Password must be between 8 and 255 characters long."
          },
          is: {
            args: [/^(?=.*[A-Z])(?=.*[0-9]).+$/],
            msg: "Password must contain at least one capital letter and one number."
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Please provide a valid email address"
          },
          len: {
            args: [3, 255],
            msg: "Email must be between 3 and 255 characters long"
          }
        }
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [0, 512],
            msg: "Avatar URL must be less than 512 characters"
          }
        }
      },
      books: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("admin", "user"),
        default: "user"
      },
      provider: {
        type: Sequelize.ENUM("local", "google"),
        default: "local"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};