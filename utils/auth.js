const jwt = require('jsonwebtoken');
const configs = require("./../configs")

const genAccessToken = (Identifeir) => {
    try {
        const token = jwt.sign({ Identifeir }, configs.jwt.jwtAccessSecret, { expiresIn: "150 day" })
        return token;
    }
    catch (e) { return res.status(500).json({ statusCode: 500, message: e.message }); }
}
const genRefreshToken = (Identifeir) => {
    try {
        const token = jwt.sign({ Identifeir }, configs.jwt.jwtRefreshSecret, { expiresIn: "70 day" })
        return token;
    }
    catch (e) { return res.status(500).json({ statusCode: 500, message: e.message }); }
}

module.exports = {
    genAccessToken,
    genRefreshToken
}