const swaggerAutogen = require('swagger-autogen')();
// Define Swagger metadata
const doc = {
    info:{
        title: 'pokemon api',
        description: 'pokemon api'
    },
    host: 'localhost:3000',
    schemes: [ 'http', 'https']
};

// path to write swagger.json
const outputFile = './swagger.json';
// Entry point for routes scanning
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);