const { Todo } = require("../models");
const { sequelize } = require("../models");

class TodoController {
  static findAll = async (req, res, next) => {
    let limit = 10;
    let offset = 0;

    try {
      const filter = {};
      if (req.query.completed) filter.completed = req.query.completed;
      if (req.query.category) filter.categoryId = req.query.category;
      if (req.query.page) offset = (req.query.page - 1) * limit;

      const todo = await Todo.findAndCountAll({
        where: filter,
        limit: limit,
        offset: offset,
        attributes: ["name", "completed"],
      });

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  static findOne = async (req, res, next) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findOne({
        where: { id: id },
        include: ["category"],
      });

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const todo = await Todo.create(req.body);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res) => {
    try {
      const todo = await Todo.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      res.status(200).json(todo[1][0]);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      await Todo.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json("Succesfully delete todo");
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodoController;
