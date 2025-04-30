const { requestLogger: logger } = require('./../utils/logger.js');

const requestLogger = (req, res, next) => {
    logger.info(`HTTP ${req.method} ${req.url}`, {
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        timestamp: new Date().toISOString()
    });
    next();
};

module.exports = requestLogger
