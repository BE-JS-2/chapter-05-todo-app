const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { Todo, User, Profile } = require('../models');
const { Api422Error, Api400Error, Api404Error } = require('../middleware/APIError');


class TodoController {
  static async addTodo(req, res, next) {
    try {
      const { name, category, due_date, isCompleted } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Api422Error(errors.array());
      }

      await Todo.create({
        userId: req.user.id,
        name, category: `${category}`, due_date, isCompleted
      })
      .then(data => {
        return res.status(201).json({
          success: true,
          message: 'todo succcessfuly added',
          data
        })
      })
      .catch(error => {
        throw new Api400Error(error.message);
      })
    } catch (error) {
      next(error);
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const { name, category, due_date, isCompleted } = req.body;
      const { id } = req.params;

      const todo = await Todo.findOne({ where: { id } });
      if (todo == null) throw new Api404Error('todo not found');

      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new Api422Error(errors.array());

      await Todo.update({
        name, category, due_date, isCompleted
      }, {
        where: { id }
      })
      .then(() => {
        return res.json({
          success: true,
          message: "todo successfully updated"
        })
      })
      .catch(error => {
        throw new Api400Error(error.message);
      })
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { limit = 25, page = 1, category = '', isCompleted = '' } = req.query;
      await Todo.findAll({
        attributes: ['id', 'name', 'due_date'],
        where: {
          [Op.or]: [{
            isCompleted: {
              [Op.in]: (isCompleted) ? [isCompleted] : ['yes', 'no']
            },
            category: {
              [Op.in]: (category) ? [category] : ['important', 'daily']
            }
          }],
          userId: req.user.id
        },
        limit: +limit,
        offset: +limit * +page - +limit
      })
      .then(data => {
        return res.json({
          success: true,
          message: 'data successfully retrieved',
          data
        })
      })
      .catch(error => {
        console.log(error);
        throw new Api400Error(error.message);
      })
    } catch (error) {
      next(error);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const { id } = req.params;

      await Todo.findOne({
        include: {
          model: User,
          as: 'user',
          include: {
            model: Profile,
            as: 'profile'
          }
        },
        where: {
          id
        }
      })
      .then(data => {
        if (data == null) {
          throw new Api404Error('Data not found');
        }
        return res.json({
          success: true,
          message: 'data successfully retrieved',
          data
        })
      })
      .catch(error => {
        throw new Api400Error(error.message);
      })
    } catch (error) {
      next(error);
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;

      await Todo.destroy({
        where: {
          id
        }
      })
      .then(() => {
        return res.json({
          success: true,
          message: "todo successfully deleted"
        })
      })
      .catch(error => {
        throw new Api400Error(error.message);
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;