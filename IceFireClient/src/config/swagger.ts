import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ice & Fire Explorer API',
      version: '1.0.0',
      description: 'API documentation for Ice & Fire Explorer backend',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints'
      },
      {
        name: 'Houses',
        description: 'Game of Thrones houses endpoints'
      }
    ],
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/**/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };