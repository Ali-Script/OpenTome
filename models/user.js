const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const user = (sequelize) =>
    sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
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
                type: DataTypes.STRING,
                allowNull: true,
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
                type: DataTypes.STRING,
                allowNull: true,
            },
            books: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            role: {
                type: DataTypes.ENUM("admin", "user"),
                defaultValue: "user"
            },
            provider: {
                type: DataTypes.ENUM("local", "google"),
                defaultValue: "local"
            }
        }, {
        timestamps: true
    });

module.exports = user;
