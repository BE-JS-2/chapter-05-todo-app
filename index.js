const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
// const { sequelize, UserGame } = require("./models");
const router = require("./routes");
const app = express();
const port = 5000;
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
