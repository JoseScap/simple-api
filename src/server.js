const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const createSwaggerSpecs = require('./config/swagger');
const apiRoutes = require('./controllers/api.controller');
const dataRoutes = require('./controllers/data.controller');
const { initializeDatabase } = require('./database');
const logger = require('./utils/logger');

const app = express();

app.set('port', 3000 || process.env.SERVER_PORT);
app.set('json spaces', 2);

// HTTP request logging
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize database
initializeDatabase().catch(error => {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
});

// Swagger UI with dynamic server configuration
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    const swaggerSpecs = createSwaggerSpecs(req);
    swaggerUi.setup(swaggerSpecs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "Simple API Documentation"
    })(req, res, next);
});

// API Routes
app.use('/api', apiRoutes);
app.use('/api/data', dataRoutes);

// Root route that redirects to documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Log server startup
app.on('listening', () => {
    logger.info(`Server started on port ${app.get('port')}`);
});

module.exports = app;
