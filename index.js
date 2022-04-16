const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const errorHandler = require('./errorHandler');
const UserController = require('./controllers/userController.js');
const TodoController = require('./controllers/todoController.js');
const { body, validationResult } = require('express-validator');
const { authorization } = require('./middlewares/authorization');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', () => {
  console.log('tes');
})

app.post('/register-user',
[
  body('fullname')
    .notEmpty(),
  body('username')
    .notEmpty()
    .withMessage('Name should not be empty'),
  body('password')
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

// middleware autentikasi
app.use(authorization) 

app.get('/todos', TodoController.list)
app.get('/todos/:id', TodoController.get)
app.post('/todos',
// middleware validasi
[
  body('name').notEmpty(),
  body('due_date')
  .notEmpty()
  .custom(value => {
    if (new Date(value) < new Date()) {
      throw new Error ('Due date should be greater than today')
    }
    return true
  })
  ,
  body('category').notEmpty(),
  body('completed').notEmpty()
],
(req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw {
        status: 400,
        message: errors.array() 
      }
    } else {
      next()
    }
},
TodoController.create)
app.put('/todos/:id',
// middleware validasi
[
  body('name').optional().notEmpty(),
  body('due_date')
  .optional()
  .notEmpty()
  .custom(value => {
    if (new Date(value) < new Date()) {
      throw new Error ('Due date should be greater than today')
    }
    return true
  })
  ,
  body('category').optional().notEmpty(),
  body('completed').optional().notEmpty()
],
(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw {
      status: 400,
      message: errors.array() 
    }
  } else {
    next()
  }
},
TodoController.update)
app.delete('/todos/:id', TodoController.delete)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})