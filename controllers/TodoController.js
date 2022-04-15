const { Todos } = require('../models')
class TodoController {
    static async getTodos (req, res, next) {
        try {
          const todos = await Todos.findAll({
            where: {
              user_id: req.user.id
            }
          })
          res.status(200).json(todos);
        } catch (err) {
          next(err);
        }
       }

    static async createTodo (req, res) {
       const todo = await Todos.create({
        name: req.body.name,
        due_date: req.body.due_date,
        categori_id: req.body.categori_id,
        completed:true,
        user_id: req.user.id,
       })
 
       res.status(201).json({
         message: 'Successfully create user'
       })
    }

    static async updateTodo(req, res, next) {
        try{
            const todo = await Todos.update({
             name: req.body.name,
             due_date: req.body.due_date,
             categori_id: req.body.categori_id,
             completed:true,
            },{
             where: {
               id: req.params.id
             },
             returning: true,
           })
           res.status(200).json(todo[1][0])
         } catch(err) {
           next(err)
         }
        }
    
    static async delete (req, res, next) {
        try {
          await Todos.destroy({
            where: {
              id: req.params.id
            }
          })
          res.status(200).json('Succesfully delete product')
        } catch(err) {
          next(err);
        }
      }
}

module.exports = TodoController;