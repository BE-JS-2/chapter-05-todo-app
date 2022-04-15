const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const UserController= require('./controllers/UserController');
const TodoController= require('./controllers/TodoController');
const errorHandler = require('./errorHandler');
const { Category } = require('./models');

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

app.post('/todo',
(req, res, next) => {
  if (req.headers.authorization) {
    const decodedToken = jwt.decode(req.headers.authorization)
    req.user = decodedToken;
    next();
  } else {
    throw {
      status: 401,
      message: 'Unauthorized'
    }
  }
},
TodoController.createTodo)

app.get('/todos',
(req, res, next) => {
  if (req.headers.authorization) {
    const decodedToken = jwt.decode(req.headers.authorization)
    req.user = decodedToken;
    next();
  } else {
    throw {
      status: 401,
      message: 'Unauthorized'
    }
  }
},
TodoController.getTodos)

app.put('/todo/:id',
[
  body('categori_id')
    .optional()
    .notEmpty()
    .withMessage('Category ID should not be empty')
    .bail()
    .custom(value => {
      return Category.findOne({
        where: {
          id: value,
        }
      }).then(category => {
        if (!category) {
          return Promise.reject('Category does not exist');
        }
      });
    })
    ,
    body('name')
    .optional()
    .notEmpty(),
    body('due_date')
    .optional()
    .notEmpty(),
    body('categori_id')
    .optional()
    .notEmpty(),
],
(req, res, next) => {
if (req.headers.authorization) {
    const decodedToken = jwt.decode(req.headers.authorization)
    req.user = decodedToken;
    next();
 } else {
    throw {
      status: 401,
      message: 'Unauthorized'
    }
  }
},
TodoController.updateTodo)

app.delete('/todo/:id',(req, res, next) => {
    if (req.headers.authorization) {
        const decodedToken = jwt.decode(req.headers.authorization)
        req.user = decodedToken;
        next();
     } else {
        throw {
          status: 401,
          message: 'Unauthorized'
        }
      }
    }, TodoController.delete)


app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})