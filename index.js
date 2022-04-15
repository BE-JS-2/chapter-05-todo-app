const express = require('express')
const app = express()
const port = 3000
const UserController = require('./controllers/user.controllers.js');
const TodoController = require('./controllers/todo.controllers');
const errorHandler = require('./errorHandler');
const { body, validationResult } = require('express-validator');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument=require('./swagger_output.json')


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));


app.use(express.urlencoded({extended: false}))
app.use(express.json())


/**
 * @swagger
 * definitions:
 * todos:
 * type:object
 * properties:
 * name:
 * type:string
 * example:'MENYAPU'
 */
app.post('/register-user',
[
  body('name')
    .notEmpty()
    .withMessage('Name should not be empty')
    ,
  body('password')
    .notEmpty()
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
app.get('/list-todo', TodoController.list)
app.get('/todo/:id', TodoController.detail)
app.post('/add-todo',
       // middleware validasi input
   [
      body('name')
        .notEmpty(),
      body('due_date')
        .notEmpty(),
      body('category_id')
        .notEmpty(),
      body('completed')
        .notEmpty(),
      body('user_id')
        .notEmpty()
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
    TodoController.addTodo)


app.put('/todo/:id',
[
  body('name')
    .optional()
    .notEmpty(),
  body('due_date')
    .optional()
    .notEmpty(),
  body('category_id')
    .optional()
    .notEmpty(),
  body('completed')
    .optional()
    .notEmpty(),
  body('user_id')
    .optional()
    .notEmpty()
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
TodoController.edit)

app.delete('/todo/:id', TodoController.delete)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})