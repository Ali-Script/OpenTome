const uuid = require("uuid")
const { redis } = require("./../redis")
const svgCaptcha = require('svg-captcha');

exports.create = async (req, res, next) => {
    try {
        const captchaID = uuid.v4();
        const captcha = svgCaptcha.createMathExpr({
            size: 2,
            mathMax: 8,
            mathOperator: "+"
        });
        console.log(captcha);
        await redis.set(`captcha${captchaID}`, captcha.text, "EX", 120)
        return res.status(200).json({ statusCode: 200, message: "Succ", captchaID, captcha: captcha.text })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}