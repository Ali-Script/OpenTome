const { Redis } = require("ioredis");
const configs = require("./configs");

const redis = new Redis(configs.redis.uri);

redis.on('error', (err) => {
    console.error('Redis error:', err);
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

module.exports = { redis };
