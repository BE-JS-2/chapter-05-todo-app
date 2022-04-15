const router = require('express').Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.put("/register", [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('birthdate').notEmpty().withMessage('Birthdate is required').custom((value) => {
        if (new Date(value) > new Date()) {
            return Promise.reject('Birthdate must be in the past');
        }
        return true;
    }).withMessage('Birthdate must be in the past'),
], userController.createUser);

router.post("/login", userController.loginUser);

module.exports = router;