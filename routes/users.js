const router   = require('express').Router();
const { body } = require('express-validator');
// Controller
const controller = require('../controllers/AuthController');

router.post(
  '/register',
  body('username')
    .isAlphanumeric().withMessage('username must be string')
    .notEmpty().withMessage('username cannot be empty'),
  body('password')
    .isAlphanumeric().withMessage('name must be string and number')
    .notEmpty().withMessage('password cannot be empty')
    .isLength({ min: 8 }).withMessage('minimum password length is 8 character'),
  body('name')
    .isString().withMessage('name must be string')
    .notEmpty().withMessage('name cannot be empty'),
  body('age')
    .isNumeric().withMessage('age must be number')
    .notEmpty().withMessage('age cannot be empty'),
  controller.register
);

router.post(
  '/login',
  body('username')
    .isAlphanumeric().withMessage('username must be string')
    .notEmpty().withMessage('username cannot be empty'),
  body('password')
    .isAlphanumeric().withMessage('name must be string and number')
    .notEmpty().withMessage('password cannot be empty')
    .isLength({ min: 8 }).withMessage('minimum password length is 8 character'),
  controller.login
);

module.exports = router;
