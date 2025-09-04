const swaggerJsdoc = require('swagger-jsdoc');

// Function to create Swagger specs with dynamic server configuration
const createSwaggerSpecs = (req) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Simple API',
                version: '1.0.0',
                description: 'A simple API designed for infrastructure testing purposes',
                contact: {
                    name: 'API Support',
                    email: 'support@example.com'
                }
            },
            servers: [
                {
                    url: baseUrl,
                    description: 'Current server'
                }
            ],
        components: {
            schemas: {
                ApiInfo: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Simple API'
                        },
                        version: {
                            type: 'string',
                            example: '1.0.0'
                        },
                        description: {
                            type: 'string',
                            example: 'A simple API for testing purposes'
                        }
                    }
                },
                HealthStatus: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'ok'
                        }
                    }
                },
                Data: {
                    type: 'object',
                    required: ['value'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Auto-generated UUID'
                        },
                        value: {
                            type: 'string',
                            description: 'The data value'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    },
                    example: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        value: 'Sample data value',
                        created_at: '2023-01-01T00:00:00.000Z',
                        updated_at: '2023-01-01T00:00:00.000Z'
                    }
                }
            }
            }
        },
        apis: ['./src/controllers/*.js'], // files containing Swagger annotations
    };

    return swaggerJsdoc(options);
};

module.exports = createSwaggerSpecs;
