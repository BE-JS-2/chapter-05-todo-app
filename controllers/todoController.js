const { todo } = require("../models");

exports.getTodos = async(req, res, next) => {
    try {
        const todos = await todo.findAll();
        res.status(200).json({
            todos
        });
    } catch (error) {
        next(error);
    }
}

exports.createTodo = async(req, res, next) => {
    try {
        const newTodo = await todo.create(req.body);
        res.status(201).json({
            newTodo
        });
    } catch (error) {
        next(error);
    }
}

exports.updateTodo = async(req, res, next) => {
    try {
        const findTodo = await todo.findByPk(req.params.id);
        if (!findTodo) {
            throw {
                status: 404,
                message: "Todo not found"
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
        await findTodo.destroy();
        res.status(200).json({
            findTodo
        });
    } catch (error) {
        next(error);
    }
}