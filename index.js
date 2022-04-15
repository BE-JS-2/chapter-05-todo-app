const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const UserController = require('./controllers/UserController.js');
const errorHandler = require('./errorHandler');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.post('/register-user',
[
  body('username')
    .notEmpty()
    .withMessage('user_name should not be empty')
    ,
  body('password')
    .notEmpty(),
  body('name')
    .notEmpty(),
  body('due_date')
    .notEmpty(),
  body('categori_id')
    .notEmpty(),
],
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  next({
    status: 400,
    message: errors.array()
  })
} else {
  next()
}
},
UserController.register);

app.post('/login', UserController.login)


app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})