const sequelize = require('./config');
const Data = require('../entities/Data')(sequelize);
const logger = require('../utils/logger');

// Initialize database and sync models
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection established successfully.');
        
        // Sync all models (create tables if they don't exist)
        await sequelize.sync({ force: false }); // Set to true to drop and recreate tables
        logger.info('Database synchronized successfully.');
        
        return { sequelize, Data };
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        throw error;
    }
};

module.exports = {
    sequelize,
    Data,
    initializeDatabase
};
