const { user } = require('../db');
const nodemailer = require("nodemailer");
const configs = require("./../configs");
const { redis } = require("./../redis");
const validator = require("./../validator/authValidator");
const { genAccessToken, genRefreshToken } = require("./../utils/auth");
const { Op } = require("sequelize");



exports.signup = async (req, res) => {
    try {
        const { email } = req.body;
        const code = String(Math.floor(1000 + Math.random() * 9000));

        const userExists = await user.findOne({ where: { email } });
        if (userExists) return res.status(409).json({ statusCode: 409, message: "User already exists !" });

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: configs.email.nodemailerEmail,
                pass: configs.email.nodemailerPassword
            }
        });

        const mailOptions = {
            from: configs.email.nodemailerEmail,
            to: email,
            subject: "Sign-Up in knowledgeGateway",
            text: code,
        };
        transport.sendMail(mailOptions, async (e, info) => {
            if (e) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Failed to send email !',
                    error: configs.isProduction == false ? e.message : undefined
                });
            }
            await redis.set(`validator ${email}`, code, "EX", 120);

            return res.status(200).json({
                statusCode: 200,
                message: 'Verification code has been sent to your email !',
            });
        });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};




exports.confirmCode = async (req, res) => {
    try {
        const { userName, password, email, code } = req.body;

        const userExists = await user.findOne({ where: { email } });
        if (userExists) return res.status(409).json({ statusCode: 409, message: "User already exists !" });

        const getOtpCode = await redis.mget(`validator ${email}`);

        if (getOtpCode[0] == null) return res.status(401).json({ statusCode: 401, message: "Code has expired !" });
        else if (code != getOtpCode[0])
            return res.status(402).json({ statusCode: 402, message: "Incorrect Code !" });
        else if (code == getOtpCode[0]) {
            await user.build({
                userName,
                password,
                email,
            }).save();
            //!     bcrypt
            const accessToken = genAccessToken({ email, role: "admin" });
            const refreshToken = genRefreshToken({ email, role: "admin" });
            res.cookie('accessToken', "accessToken", { maxAge: 900000 });
            res.cookie('refreshToken', "refreshToken", { maxAge: 900000 });

            return res.status(200).json({ statusCode: 200, message: "User created Succ" });
        }
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        //!!!!!!!!! bcrypt
        //!!! validator
        const { identifier, password } = req.body;

        const findUser = await user.findOne({
            where: {
                [Op.or]: [
                    { userName: identifier },
                    { email: identifier }
                ]
            }
        });

        if (!findUser) {
            return res.status(404).json({ statusCode: 404, message: "User not found" });
        }

        if (findUser.password != password) return res.status(401).json({ statusCode: 401, message: "Incorrect password" })
        else return res.status(200).json({ statusCode: 200, message: "Login Succ" });

    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};
