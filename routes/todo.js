const router = require('express').Router();
const todoController = require('../controllers/todoController');
const isAuth = require('../middlewares/isAuth');
const { body } = require('express-validator');

router.get("/todos", isAuth, todoController.getTodos);

router.post("/todo", isAuth, [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('duedate').custom((value) => {
            if (new Date(value) < new Date()) {
                return Promise.reject('Due date must be in the future');
            }
            return true;
        }).withMessage('Due date must be in the future')
        .notEmpty().withMessage('Due date is required'),
        body('completed').notEmpty().withMessage('Completed is required')
    ],
    todoController.createTodo);

router.get("/todo/:id", isAuth, todoController.detailTodo);

router.put("/todo/:id", isAuth, [
    body('duedate').custom((value) => {
        if (new Date(value) < new Date()) {
            return Promise.reject('Due date must be in the future');
        }
        return true;
    }).withMessage('Due date must be in the future'),
], todoController.updateTodo);

router.delete("/todo/:id", isAuth, todoController.deleteTodo);

module.exports = router;