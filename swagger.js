const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Binar Todo",
    description: "Todo App",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
