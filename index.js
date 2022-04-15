const express = require("express");
const app = express();
const errorHandler = require("./error_handler");
const todoRouter = require("./routes/todo_routes");
const userRouter = require("./routes/user_routes");
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRouter);
app.use("/", todoRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
