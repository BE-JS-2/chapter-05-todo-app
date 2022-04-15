const { todo, user } = require("../models");
const { validationResult } = require('express-validator');

exports.getTodos = async(req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = 2;
        const offset = (page - 1) * limit;
        const completed = req.query.completed;
        const category = req.query.category;
        const whereQuery = {
            userId: req.userId,
        }
        if (completed) {
            whereQuery.completed = completed === "true";
        }
        if (category) {
            whereQuery.categoryId = +category;
        }
        const todos = await todo.findAll({
            attributes: ['title', 'completed'],
            where: whereQuery,
            limit,
            offset
        });
        res.status(200).json({
            todos
        });
    } catch (error) {
        next(error);
    }
}

exports.detailTodo = async(req, res, next) => {
    try {
        const findTodo = await todo.findByPk(req.params.id);
        if (!findTodo) {
            throw {
                status: 404,
                message: "Todo not found"
            }
        }
        if (findTodo.userId !== req.userId) {
            throw {
                status: 403,
                message: "Forbidden"
            }
        }
        res.status(200).json({
            findTodo
        });
    } catch (error) {
        next(error);
    }
}

exports.createTodo = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw {
                status: 422,
                message: errors
            }
        }
        const newTodo = await todo.create({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json({
            newTodo
        });
    } catch (error) {
        next(error);
    }
}

exports.updateTodo = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw {
                status: 422,
                message: errors
            }
        }
        const findTodo = await todo.findByPk(req.params.id);
        if (!findTodo) {
            throw {
                status: 404,
                message: "Todo not found"
            }
        }
        if (findTodo.userId !== req.userId) {
            throw {
                status: 401,
                message: "Unauthorized"
            }
        }
        const updatedTodo = await findTodo.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        res.status(200).json({
            updatedTodo
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteTodo = async(req, res, next) => {
    try {
        const findTodo = await todo.findByPk(req.params.id);
        if (!findTodo) {
            throw {
                status: 404,
                message: "Todo not found"
            }
        }
        if (findTodo.userId !== req.userId) {
            throw {
                status: 401,
                message: "Unauthorized"
            }
        }
        await findTodo.destroy();
        res.status(200).json({
            findTodo
        });
    } catch (error) {
        next(error);
    }
}