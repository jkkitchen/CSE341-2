const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Week 3 Project API Documentation',
    description: 'Week 3 Assignment'
  },
    host: 'cse341-2-ccuc.onrender.com', //Render URL
    schemes: ['https']    
};

const outputFile = './swagger-output.json';

//Endpoint is server.js because routes are listed there
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);