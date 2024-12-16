// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MERN AUTH',
            version: '1.0.0',
            description: 'MERN AUTH API',
        },
        servers: [
            {
                url: 'https://localhost:5000',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
}

export const specs = swaggerJsdoc(options)
