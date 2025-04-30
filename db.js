const { Sequelize } = require("sequelize")
const configs = require("./configs")
const logger = require("./utils/logger").logger

const db = new Sequelize({
    username: configs.db.username,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
    logging: (msg) => logger.debug(msg)
});

/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const author = require("./models/author")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const book = require("./models/book")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const category = require("./models/category")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const user = require("./models/user")(db);

author.hasMany(book, {
    foreignKey: 'author_id',
    onDelete: "CASCADE"
})
category.hasMany(book, {
    foreignKey: 'category_id',
    onDelete: "CASCADE"
})

module.exports = {
    author,
    book,
    category,
    user,
    db
}
