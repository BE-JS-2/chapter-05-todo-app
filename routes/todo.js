const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get("/todos", todoController.getTodos);

router.post("/todo", todoController.createTodo);

router.put("/todo/:id", todoController.updateTodo);

router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;