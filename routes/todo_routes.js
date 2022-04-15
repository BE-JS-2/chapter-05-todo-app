const express = require("express");
const todoRouter = express.Router();
const { body, validationResult } = require("express-validator");
const TodoController = require("../controllers/todo_controller");
const { User, Category } = require("../models");
const dayjs = require("dayjs");

const validator = [
  body("user_id")
    .notEmpty()
    .custom(async (user_id) => {
      const users = await User.findAll();
      const user_ids = users.map((user) => user.id);
      const maxId = Math.max(...user_ids);
      if (user_id > maxId) throw "User Id not found";
      return true
    }),
  body("category_id")
    .notEmpty()
    .custom(async (category_id) => {
      const categories = await Category.findAll();
      const category_ids = categories.map((category) => category.id);
      const maxId = Math.max(...category_ids);
      if (category_id > maxId) throw "Category Id not found";
      return true;
    }),
  body("name").notEmpty(),
  body("description").notEmpty(),
  body("due_date")
    .notEmpty()
    .custom((date) => {
      const today = new Date();
      console.log(dayjs(date).toDate().getTime());
      console.log(today.getTime());
      if (dayjs(date).toDate().getTime() <= today.getTime())
        throw "Due date tidak boleh sama atau lebih kecil dengan hari ini";
      return true;
    }),
  body("completed").notEmpty(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      status: 400,
      message: errors.array(),
    });
  } else {
    next();
  }
};

todoRouter.post("/todos", validator, validate, TodoController.addTodo);
todoRouter.get("/todos", TodoController.getAllTodos);
todoRouter.get("/todos/:id", TodoController.getTodoById);
todoRouter.put("/todos/:id", validator, validate, TodoController.updateTodo);
todoRouter.delete("/todos/:id", TodoController.deleteTodo);

module.exports = todoRouter;
