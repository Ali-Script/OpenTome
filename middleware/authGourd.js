const jwt = require('jsonwebtoken');
const userModel = require('./../models/user');
const configs = require("./../configs")
const { user } = require("./../db")
require("dotenv").config()

module.exports = async (req, res, next) => {
    try {

        const headers = req.header("Authorization")?.split(" ")
        if (headers?.length !== 2) {
            return res.status(401).json({ statusCode: 401, message: "Unauthorized !" })
        }
        const token = headers[1]

        const decoded = jwt.verify(token, configs.jwt.jwtAccessSecret)

        const findUser = await user.findOne({ where: { id: decoded.Identifeir.id } })
        if (!findUser) return res.status(404).json({ statusCode: 404, message: "User Not Found !" })

        Reflect.deleteProperty(findUser.dataValues, "password")

        req.user = findUser.dataValues

        return next();
    }
    catch (err) {
        return res.status(500).json({ statusCode: 500, error: err.message })
    }
};
