const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const author = sequelize.define("author", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: 1000,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  books: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
  timestamps: true
});

module.exports = author;
