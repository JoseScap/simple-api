const router = require('express').Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get application information
 *     description: Returns basic information about the API
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Application information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiInfo'
 *             example:
 *               name: "Simple API"
 *               version: "1.0.0"
 *               description: "A simple API designed for infrastructure testing purposes"
 */
router.get('/', (req, res) => {
    res.json({
        name: 'Simple API',
        version: '1.0.0',
        description: 'A simple API designed for infrastructure testing purposes'
    });
});

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API health status
 *     description: Returns the health status of the application
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Health status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 *             example:
 *               status: "ok"
 */
router.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

module.exports = router;