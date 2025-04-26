const axios = require("axios")
const { logger } = require("./../utils/logger")
const infoLogger = async (req, res) => {

    const userIp = req.ip;
    const response = await axios.get(`http://ip-api.com/json/${userIp}`);
    const { country, city } = response.data;

    logger.info(`Request received: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)} User  IP: ${userIp}, Country: ${country}, City: ${city} `);

}

module.exports = infoLogger;