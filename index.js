const express = require('express')
const app = express()
const port = 3000
const Todo = require('./controller/todo.controller')
const UserController = require('./controller/user.controller')
const errorHandler = require('./errorHandler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const { Category } = require('./models')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.urlencoded({ extended: false}))
app.use(express.json())


app.post('/user-registration',
[
  body('username').notEmpty(),
  body('password').notEmpty(),
  body('birthdate').notEmpty(),
  body('gender').notEmpty()
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
UserController.register)
app.post('/user-login', UserController.login)
app.get('/todos',
(req, res, next) => {
  if (req.headers.authorization) {
    const user = jwt.decode(req.headers.authorization)
    req.user = user
    next()
  } else {
    throw {
      status: 401,
      message: 'Unauthorized request'
    }
  }
},
Todo.list)
app.get('/todos/:id', 
(req, res, next) => {
  if (req.headers.authorization) {
    const user = jwt.decode(req.headers.authorization)
    req.user = user
    next()
  } else {
    throw {
      status: 401,
      message: 'Unauthorized request'
    }
  }
},
Todo.get)
app.post('/todos',
// middleware autentikasi
(req, res, next) => {
  if (req.headers.authorization) {
    const user = jwt.decode(req.headers.authorization)
    req.user = user
    next()
  } else {
    throw {
      status: 401,
      message: 'Unauthorized request'
    }
  }
},
// middleware validasi
[
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('due_date')
  .notEmpty()
  .custom(value => {
    if (new Date(value) < new Date()) {
      throw new Error ('Due date should be greater than today')
    }
    return true
  })
  ,
  body('categoryId').notEmpty()
  .custom(async value => {
    const category = await Category.findOne({
      where: {
        id: value
      }
    })
    if (!category) {
      throw new Error ('Category not available')
    }
    return true
  })
  ,
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
Todo.create)
app.put('/todos/:id',
(req, res, next) => {
  if (req.headers.authorization) {
    const user = jwt.decode(req.headers.authorization)
    req.user = user
    next()
  } else {
    throw {
      status: 401,
      message: 'Unauthorized request'
    }
  }
},
// middleware validasi
[
  body('name').optional().notEmpty(),
  body('description').optional().notEmpty(),
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
  body('categoryId').optional().notEmpty()
  .custom(async value => {
    const category = await Category.findOne({
      where: {
        id: value
      }
    })
    if (!category) {
      throw new Error ('Category not available')
    }
    return true
  })
  ,
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
 Todo.update)
app.delete('/todos/:id',
(req, res, next) => {
  if (req.headers.authorization) {
    const user = jwt.decode(req.headers.authorization)
    req.user = user
    next()
  } else {
    throw {
      status: 401,
      message: 'Unauthorized request'
    }
  }
},
 Todo.delete)

app.use(errorHandler)

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})