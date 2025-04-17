const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Book = sequelize.define("books", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: 1000,
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

module.exports = Book;
