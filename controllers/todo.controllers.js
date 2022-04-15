const { Todo} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const { sequelize } = require('../models')

class TodoController {
   static async list (req, res,next) {
    try {
      const products = await Todo.findAll({
        attributes: [
          'name', 
          'completed', 
        ],
      })
      res.status(200).json(products);
    } catch(err) {
      next(err);
    }
    }

    static async detail (req, res, next) {
    try {
      const todo = await Todo.findOne({
        where: {
          id: req.params.id,
        }
      })
      if (!todo) {
        throw {
          status: 404,
          message: 'Todo not found'
        }
      } else {
        res.status(200).json(todo);
      }
    } catch (err) {
      next(err)
    }
    }
    
    static async addTodo(req, res, next) {

        try {
            const user = await Todo.create({
                name: req.body.name,
                due_date: req.body.due_date,
                category_id: req.body.category_id,
                completed: req.body.completed,
                user_id: req.body.user_id,
            })

            res.status(201).json({
                message: 'Successfully create TODO'
            })
    
        } catch {
            next(error)
        }
        
  }
  
    static async edit(req, res, next) {
    try {
      const updatedTodo = await Todo.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true,
      })
      res.status(200).json(updatedTodo[1][0])
    } catch(err) {
      next(err)
    }
  }

    static async delete (req, res, next) {
    try {
      await Todo.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json('Succesfully delete TODO')
    } catch(err) {
      next(err);
    }
  }



};

module.exports = TodoController;