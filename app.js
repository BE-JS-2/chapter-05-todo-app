const express         = require('express');
const logger          = require('morgan');
const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

// Middleware
const ErrorHandler = require('./middleware/ErrorHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', usersRouter);
app.use('/todos', todosRouter);

// Error Handler
app.use(ErrorHandler)

module.exports = app;
