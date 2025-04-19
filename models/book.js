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
      desciption: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    }, {
    timestamps: true
  });

module.exports = book;
