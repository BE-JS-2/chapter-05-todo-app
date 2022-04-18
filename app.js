const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const todosRouter = require("./routes/todos");
const { errorHandling } = require("./middlewares/errorHandler");
const { authorization } = require("./middlewares/authenticator");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/", indexRouter);
app.use(authorization);
app.use("/todos", todosRouter);
app.use(errorHandling);

module.exports = app;
