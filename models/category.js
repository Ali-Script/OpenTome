const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const categories = sequelize.define("categories", {
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
}, {
    timestamps: false
});

module.exports = categories;
