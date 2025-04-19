const { db } = require("./db");
const app = require("./app");
const configs = require("./configs");
const { redis } = require("./redis");

async function startServer() {
    try {
        // Database connection with retry logic
        try {
            await db.authenticate();
            console.log('Database connection established');
        } catch (dbErr) {
            console.error('Failed to connect to database:', dbErr);
            process.exit(1);
        }

        // Redis connection check
        try {
            await redis.ping();
            console.log('Redis connection established');
        } catch (redisErr) {
            console.error('Failed to connect to Redis:', redisErr);
            process.exit(1);
        }

        // Start server
        const server = app.listen(configs.db.port, () => {
            console.log(`Server listening on port ${configs.db.port}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => shutdown(server));
        process.on('SIGINT', () => shutdown(server));

    } catch (err) {
        console.error('Server startup failed:', err);
        await shutdown();
        process.exit(1);
    }
}

async function shutdown(server) {
    try {
        console.log('Shutting down gracefully...');

        if (server) {
            await new Promise(resolve => server.close(resolve));
        }

        await db.close();
        await redis.quit();

        console.log('All connections closed');
        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
}

startServer().catch(err => {
    console.error('Unhandled startup error:', err);
    process.exit(1);
});
