const router = require('express').Router();
const { Data } = require('../database');
const logger = require('../utils/logger');

/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       required:
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID
 *         value:
 *           type: string
 *           description: The data value
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         value: "Sample data value"
 *         created_at: "2023-01-01T00:00:00.000Z"
 *         updated_at: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get all data entries
 *     description: Retrieve all data entries from the database
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of all data entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Data'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const data = await Data.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        logger.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/data/{id}:
 *   get:
 *     summary: Get data by ID
 *     description: Retrieve a specific data entry by its UUID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The data UUID
 *     responses:
 *       200:
 *         description: Data entry found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Data.findByPk(id);
        
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        
        res.json(data);
    } catch (error) {
        logger.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/data:
 *   post:
 *     summary: Create new data entry
 *     description: Create a new data entry with auto-generated UUID
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *                 description: The data value
 *           example:
 *             value: "New data value"
 *     responses:
 *       201:
 *         description: Data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       400:
 *         description: Bad request - validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const { value } = req.body;
        
        if (!value || value.trim() === '') {
            return res.status(400).json({ error: 'Value is required and cannot be empty' });
        }
        
        const data = await Data.create({ value });
        res.status(201).json(data);
    } catch (error) {
        logger.error('Error creating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/data/{id}:
 *   put:
 *     summary: Update data entry
 *     description: Update an existing data entry by its UUID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The data UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *                 description: The new data value
 *           example:
 *             value: "Updated data value"
 *     responses:
 *       200:
 *         description: Data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
        
        if (!value || value.trim() === '') {
            return res.status(400).json({ error: 'Value is required and cannot be empty' });
        }
        
        const data = await Data.findByPk(id);
        
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        
        await data.update({ value });
        res.json(data);
    } catch (error) {
        logger.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/data/{id}:
 *   delete:
 *     summary: Delete data entry
 *     description: Delete a specific data entry by its UUID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The data UUID
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data deleted successfully"
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Data.findByPk(id);
        
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        
        await data.destroy();
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        logger.error('Error deleting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
