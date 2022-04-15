require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
const errorRoutes = require('./middlewares/errorHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(todoRoutes);
app.use(userRoutes);

app.use(errorRoutes);


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});