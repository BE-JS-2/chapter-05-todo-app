const { Todos } = require('../models')

class TodoController {
  static async list (req, res, next) {
    try {
      // console.log(req.user)
      const option = {
        where: {
          userId: req.user.id
        },
        attributes: ['id', 'name', 'completed', 'category']
      } 
  
      if (req.query.completed === 'false') {
        option.where.completed = false
      } else if (req.query.completed === 'true') {
        option.where.completed = true
      }
  
      if (req.query.category) {
        option.where.category = req.query.category
      }
      const todo = await Todos.findAll(option)
  
      console.log(req.query)
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  static async get (req, res, next) {
    try {
        // console.log(req.user)
        const todo = await Todos.findAll({
          where: {
            userId: req.user.id,
            id: req.params.id
          }
        })
        res.status(200).json(todo);
      } catch (err) {
        next(err);
      }
  }

  static async create (req, res, next) {
    const todo = await Todos.create({
      userId: req.user.id,
      name: req.body.name,
      due_date: req.body.due_date,
      category: req.body.category,
      completed: req.body.completed,
    })

    res.status(201).json({
      message: 'Successfully create todo'
    })
  }
  
  static async update (req, res, next) {
    try {
      const todo = await Todos.findOne({
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
        await Todos.update(req.body, {
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
      const todo = await Todos.findOne({
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
        await Todos.destroy({
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

module.exports = TodoController;