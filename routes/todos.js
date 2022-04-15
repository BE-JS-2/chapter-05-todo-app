const router = require('express').Router();
const { body } = require('express-validator');

// Controller Todos
const controller = require('../controllers/TodoController');

//Middleware
const authorize = require('../middleware/Authorize'); 

router.post(
  '/',
  body('name')
    .isString().withMessage('name must be string')
    .notEmpty().withMessage('name cannot be empty'),
  body('category')
    .isIn(['important', 'daily']).withMessage('category must be contain important or daily')
    .notEmpty().withMessage('category cannot be empty'),
  body('due_date')
    .isDate().withMessage('due_date must be date')
    .notEmpty().withMessage('due_date cannot be empty'),
  body('isCompleted')
    .isIn(['yes', 'no']).withMessage('category must be contain Yes or No')
    .notEmpty().withMessage('isCompleted cannot be empty'),
  authorize,
  controller.addTodo
);

router.put(
  '/:id',
  body('name')
    .isString().withMessage('name must be string')
    .notEmpty().withMessage('name cannot be empty'),
  body('category')
    .isIn(['important', 'daily']).withMessage('category must be contain important or daily')
    .notEmpty().withMessage('category cannot be empty'),
  body('due_date')
    .isDate().withMessage('due_date must be date')
    .notEmpty().withMessage('due_date cannot be empty'),
  body('isCompleted')
    .isIn(['yes', 'no']).withMessage('category must be contain Yes or No')
    .notEmpty().withMessage('isCompleted cannot be empty'),
  authorize,
  controller.updateTodo);

router.delete('/:id', authorize, controller.deleteTodo);

router.get('/', authorize, controller.getAll);
router.get('/:id', authorize, controller.getDetail);

module.exports = router;
