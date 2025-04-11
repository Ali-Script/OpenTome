const express = require('express');
const path = require('path');
const swaggerDoc = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

// Configuration options for Swagger UI
const options = {
    explorer: true,
    customSiteTitle: "Knowledge Gateway API",
    customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 20px 0 }
    .swagger-ui .opblock-tag { font-size: 1.2em }
  `,
    swaggerOptions: {
        defaultModelsExpandDepth: -1,
        docExpansion: 'list',
        validatorUrl: null
    }
};

// Serve Swagger UI
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDoc, options));

// Error handling middleware
router.use((err, req, res, next) => {
    console.error('Swagger UI Error:', err);
    res.status(500).json({
        statusCode: 500,
        message: 'Failed to load API documentation'
    });
});

module.exports = router;
