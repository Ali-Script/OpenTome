const { redis } = require("./../redis")
const verify = async (res, captchaID, captcha, next) => {


    const key = await redis.mget(`captcha${captchaID}`)

    console.log(key);

    if (key != captcha) return res.status(200).json({ statusCode: 200, message: "od" });
    // else return true


}
module.exports = verify