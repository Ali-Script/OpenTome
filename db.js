const { Sequelize } = require("sequelize")
const configs = require("./configs")

const author = require("./models/author")
const book = require("./models/book")
const category = require("./models/category")

const sequelize = new Sequelize({
    username: configs.db.username,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
    logging: configs.isProduction ? false : console.log(),
});


author.hasMany(book, {
    foreignKey: 'author_id',
    onDelete: "CASCADE"
})
category.hasMany(book, {
    foreignKey: 'category_id',
    onDelete: "CASCADE"
})

module.exports = sequelize