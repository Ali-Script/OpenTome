
const sequelize = require('../db');
const User = require('../models/user')
const nodemailer = require("nodemailer")
const emailValidator = require("email-validator");
const configs = require("./../configs")
const { redis } = require("./../redis")
exports.signup = async (req, res, next) => {
    try {
        const { email } = req.body;
        const code = String(Math.floor(1000 + Math.random() * 9000))

        const user = await User.findOne({ where: { email } });
        if (user) return res.status(409).json({ statusCode: 409, message: "User already exists" })

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: configs.email.nodemailerEmail,
                pass: configs.email.nodemailerPassword
            }
        })

        const mailOptions = {
            from: configs.email.nodemailerEmail,
            to: email,
            subject: "Sign-Up in knowledgeGateway",
            text: code,
        }
        transport.sendMail(mailOptions, async (e, info) => {
            if (e) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Failed to send email',
                    error: configs.isProduction == false ? e.message : undefined
                });
            }
            await redis.set(`validator ${email}`, 2, "EX", 120)

            return res.status(200).json({
                statusCode: 200,
                message: 'Verification code has been sent to your email',
            });
        });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}
