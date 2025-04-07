const { Sequelize } = require("sequelize")
const configs = require("./configs")

const sequelize = new Sequelize({
    username: configs.db.username,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
    logging: configs.isProduction ? false : console.log(),
});


module.exports = sequelize