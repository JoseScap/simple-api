const app = require('./src/server');
const logger = require('./src/utils/logger');

app.listen(app.get('port'), () => {
    logger.info(`Server is running on port ${app.get('port')}`);
});