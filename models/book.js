const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const book = (sequelize) =>
  sequelize.define(
    "books",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalDownloads: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },

    }, {
    timestamps: true,
    initialAutoIncrement: 1000,
  });

module.exports = book;
