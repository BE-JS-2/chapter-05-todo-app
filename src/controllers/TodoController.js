const {categories,todos} = require('../models')

module.exports={
    createTodos :  async(req,res,next) => {
        try {
                const category = await categories.findOne({
                    where: {
                        id:req.body.categories_id,
                    }
                })
                if(!category) {
                    res.status(404).json({
                        "status": 404,
                        "msg": 'category not found'
                    })
                }
                else {

                    const todo = await todos.create({
                        user_id : req.user.id,
                        categories_id : req.body.categories_id,
                        title : req.body.title,
                        description: req.body.description,
                        due_date: req.body.due_date
                      
                    })
                    
                   
                    
                    res.status(200).json({
                        msg:'success create todos',
                        todo
                    })
                }
     
        }catch(error) {
            next(error)
        }
    },
    getListTodos: async(req,res,next) => {
        try {
            const data = await todos.findAll({
                where: {
                    user_id : req.user.id
                },
                attributes:['title','completed']
            })
            res.status(200).json(data)
        } catch (error) {
            next(err)
        }
    },
    updateTodos : async (req,res,next) => {
        try {
            const {id} = req.params;
            const {body} = req;
            let findtodos = await todos.findOne({
                where: {
                    id,
                }
            })
            if(findtodos === null) {
                res.status(404).send({
                    msg: "update todos is error",
                    status: 404,
                    error: "data is not found"
                })
            }
            else{
             todos.update(body,{
                    where:{
                       id,
                    }
                })
                res.status(200).send({
                    message: "success updated",
                    status:200,
                    findtodos
                })
               
            }
        } catch (err) {
            next(err)
        }
    },
    deleteTodos : async(req,res,next) => {
        const{id} = req.params;
        try {
            let findTodos=  await todos.findOne({
                where: {
                    id
                }
            })
            if(findTodos === null) {
                res.status(404).send({
                    message : 'delete is error',
                    status: 404,
                    error: 'data is not found'
                })
            }else {
                todos.destroy({
                    where:({
                        id
                    })
                })
                res.status(200).send({
                    message: 'success deleted',
                    status: 200,
                    findTodos
                })
            }
        } catch (err) {
            next(err)
        }
    },
    filterByCompleted : async (req,res,next) => {
        try {
            let data = await todos.findAll({
                where: {
                    completed: req.query.completed
                  }
            })
            res.status(200).json({
                message:`success`,
                data
            })
        } catch (error) {
            next(error)
        }
    },
  filterByCategory: async(req,res,next) => {
      try {
          let data = await todos.findAll({
              where: {
                  categories_id: req.query.categories_id
              }
          })
            res.status(200).json({
                message:`succes`,
                data
            })
        
      } catch (error) {
          next(error)
      }
  },
  getTodosPaginate : async (req,res,next) => {
      try {
          const page = req.query.page;
          const dataPerPage = 5
          const offset = (page-1) * dataPerPage

          let data = await todos.findAll({
              limit:dataPerPage,
              offset:offset
          })
          res.status(200).json({
              message: 'get all todos success',
              status:200,
              data

          })
      } catch (err) {
         next(error)
      }
  }

   
}