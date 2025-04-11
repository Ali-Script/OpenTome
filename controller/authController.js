
const sequelize = require('../db');
const User = require('../models/user')
exports.signup = async (req, res, next) => {
    try {
        console.log("OK");
        const createUser = User.build({
            userName: "ali-script",
            password: "Alialiali.8585",
            email: "algail.com"
        })
        await createUser.save();
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}
