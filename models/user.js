const { DataTypes } = require("sequelize")

const User = (sequelize) => sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primarykey: true,
        autoincrement: 1000
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [3, 32],
                msg: "Username must be between 3 and 32 characters long."
            },
            is: {
                args: [/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9._]{3,32}$/],
                msg: "Username must contain at least one letter, one number, and can only include letters, numbers, '.', and '_'."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 512],
                msg: "Avatar URL must be less than 512 characters"
            }
        }
    },
    books: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        default: "user"
    },
    provider: {
        type: DataTypes.ENUM("local", "google"),
        allowNull: false,
        default: "local"
    },
},
    {
        timestamps: true
    })


module.exports = User;
