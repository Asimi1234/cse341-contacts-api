const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 Contacts REST API'
  },
  host: 'cse341-contacts-api-l034.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

// Generate swagger-output.json from the route annotations
swaggerAutogen(outputFile, routes, doc);
