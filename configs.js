require("dotenv").config();

const configs = {
    db: {
        port: process.env.PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        name: process.env.DB_DATABASE,

        dialect: process.env.DB_DIALECT,
        poolSize: process.env.DB_POOLSIZE
    },
    redis: {
        uri: process.env.REDIS_URI
    },
    email: {
        nodemailerEmail: process.env.NODEMAILER_EMAIL,
        nodemailerPassword: process.env.NODEMAILER_EMAIL_PASSWORD
    },
    jwt: {
        jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET
    },
    google: {
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    domain: process.env.DOMAIN,
    isProduction: process.env.NODE_ENV == "production"
}

module.exports = configs
