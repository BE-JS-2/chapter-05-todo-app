const swaggerAutogen = require('swagger-autogen')();

const output = "./swagger.json";
const endpoint = ['./routes/todo', './routes/user'];

swaggerAutogen(output, endpoint)
    .then(() => {
        console.log('swagger.json generated');
    });