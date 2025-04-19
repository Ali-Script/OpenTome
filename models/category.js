const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const category = (sequelize) =>
    sequelize.define(
        "categories",
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
        }, {
        timestamps: false
    });

module.exports = category;
