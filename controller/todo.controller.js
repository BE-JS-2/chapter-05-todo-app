const { Todo, Category } = require('../models/index.js')
class TodoController {
  static async list (req, res, next) {
    const option = {
      where: {
        userId: req.user.id
      },
      attributes: ['id', 'name', 'completed', 'categoryId']
    } 

    if (req.query.completed === 'false') {
      option.where.completed = false
    } else if (req.query.completed === 'true') {
      option.where.completed = true
    }

    if (req.query.categoryId) {
      option.where.categoryId = Number(req.query.categoryId)
    }
    const todos = await Todo.findAll(option)

    console.log(req.query)
    res.status(200).json(todos)
  }

  static async create (req, res, next) {
    const todo = await Todo.create({
      userId: req.user.id,
      name: req.body.name,
      description: req.body.description,
      due_date: req.body.due_date,
      categoryId: req.body.categoryId,
      completed: req.body.completed,
    })

    res.status(201).json({
      message: 'Successfully create todo'
    })
  }

  static async get (req, res, next) {
    try {
      const todo = await Todo.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        },
        include: {
          model: Category,
          as: 'category'
        }
      })
      console.log(todo)
      if (!todo) {
        throw {
          status: 404,
          message: 'Todo not found'
        }
      } else {
        res.status(200).json(todo)
      }
    } catch (err) {
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const todo = await Todo.findOne({
        where: {
          userId: req.user.id,
          id: req.params.id
        }
      })

      if (!todo) {
        throw {
          status: 404,
          message: 'Todo not found'
        }
      } else {
        await Todo.update(req.body, {
          where: {
            userId: req.user.id,
            id: req.params.id
          }
        })
        res.status(200).json({
          message: 'Successfully update todo'
        })
      }
    } catch (err) {
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const todo = await Todo.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      })
      if (!todo) {
        throw {
          status: 404,
          message: 'Todo not found'
        }
      } else {
        await Todo.destroy({
          where: {
            id: req.params.id,
            userId: req.user.id
          }
        })
        res.status(200).json({
          message: 'Succesfully delete todo'
        })
      }
    } catch (err) {
      next(err)
    }
  }
}


module.exports = TodoController
