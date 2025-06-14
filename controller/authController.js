const { user } = require('../db');
const nodemailer = require("nodemailer");
const configs = require("./../configs");
const { redis } = require("./../redis");
const validator = require("./../validator/authValidator");
const { genAccessToken, genRefreshToken } = require("./../utils/auth");
const { Op } = require("sequelize");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");



exports.signup = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(422).json({ statusCode: 422, message: "Email is required" });
        if (!emailValidator.validate(email)) return res.status(422).json({ statusCode: 422, message: "Wrong format" });

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
            subject: "Sign-Up in OpenTome",
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

            const newUser = await user.create({
                userName,
                password,
                email,
            });
            //!     bcrypt
            //! hash tokens0
            const accessToken = genAccessToken({ id: newUser.dataValues.id });
            const refreshToken = genRefreshToken({ id: newUser.dataValues.id });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Lax",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 100
            });

            await redis.set(`refreshToken ${email}`, refreshToken, "EX", 6048000);

            return res.status(200).json({ statusCode: 200, message: "User created Succ", accessToken });
        }
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};
exports.login = async (req, res) => {
    try {
        //!!!!!!!!! bcrypt
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
        else {
            const accessToken = genAccessToken({ id: findUser.dataValues.id });
            const refreshToken = genRefreshToken({ id: findUser.dataValues.id });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Lax",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 100
            });

            // await redis.set(`refreshToken ${findUser.email}`, refreshToken, "EX", 604800);
            const getOtpCode = await redis.mget(`refreshToken ${findUser.email}`);
            console.log(getOtpCode[0]);

            return res.status(200).json({ statusCode: 200, message: "Login Succ", getOtpCode });
        }

    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};
exports.getme = async (req, res) => {
    try {

        return res.status(200).json({ statusCode: 200, user: req.user });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};
exports.genRefreshToken = async (req, res) => {
    try {
        //!!!!!!!!! bcrypt
        const token = req.cookies.refreshToken
        const decoded = jwt.verify(token, configs.jwt.jwtRefreshSecret)

        const findUser = await user.findOne({ where: { id: decoded.Identifeir.id } })
        if (!findUser) return res.status(404).json({ statusCode: 404, message: "User Not Found !" })

        const accessToken = genAccessToken({ id: findUser.dataValues.id });

        return res.status(200).json({ statusCode: 200, token: accessToken })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};
