const { Todo } = require("../models");
const sequelize = require("sequelize");
const { User, Category } = require("../models");
const dayjs = require('dayjs');

class TodoController {
  static async addTodo(req, res, next) {
    try {
      const { user_id, category_id, name, description, due_date, completed } = req.body;
      const todo = await Todo.create({
        user_id,
        category_id,
        name,
        description,
        due_date: dayjs(due_date).toDate(),
        completed,
      });
      res.status(201).json({
        message: "Succesfully create todo",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllTodos(req, res, next) {
    try {
      const todos = await Todo.findAll({
        attributes: ["name", "completed"],
      });
      if (todos === null)
        throw {
          status: 404,
          message: "Not found",
        };
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }
  static async getTodoById(req, res, next) {
    const { id } = req.params;
    try {
      const todo = await Todo.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: [],
          },
          {
            model: Category,
            as: "category",
            attributes: [],
          },
        ],
        where: {
          id,
        },
        attributes: [
          "id",
          "name",
          [sequelize.literal('"category"."name"'), "todo_category"],
          "description",
          "due_date",
          "completed",
        ],
      });
      if (todo === null)
        throw {
          status: 404,
          message: "Not found",
        };
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }
  static async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const oldtodo = await Todo.findOne({
          where: {
              id,
          }
      })
      const {
        user_id = oldtodo.user_id,
        category_id,
        name,
        descrption,
        completed = oldtodo.completed,
        due_date,
        createdAt,
      } = req.body;
      await Todo.update(
        {
          user_id,
          category_id,
          name,
          descrption,
          completed,
          due_date: dayjs(due_date).toDate(),
          createdAt,
          updatedAt: new Date(),
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      res.status(200).json({
          message: 'Successfully updated todo'
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      await Todo.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "Success delete todo",
      });
    } catch (error) {
        next(error)
    }
  }
}

module.exports = TodoController;
