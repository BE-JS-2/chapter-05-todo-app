const TodoRoutes = require('express').Router()
const TodoController = require('../controllers/TodoController')
const jwt = require('jsonwebtoken');

TodoRoutes.post('/create',(req,res,next)=> {
    if(req.headers.authorization){
        const decodedToken = jwt.decode(req.headers.authorization)
        console.log(decodedToken)
        req.user = decodedToken
        next();
    }else {
        throw{
            status: 401,
            message: 'Unauthorized'
        }
    }
},TodoController.createTodos)

TodoRoutes.get('/list',(req,res,next) => {
    if(req.headers.authorization) {
        const decodedToken = jwt.decode(req.headers.authorization)
        req.user = decodedToken;
        next();
    }else {
        throw {
            status: 401,
            message: 'unauthorized'
        }
    }
},TodoController.getListTodos)

TodoRoutes.put('/:id',TodoController.updateTodos)
TodoRoutes.delete('/:id', TodoController.deleteTodos)
TodoRoutes.get('/completed',TodoController.filterByCompleted)
TodoRoutes.get('/categories',TodoController.filterByCategory)
TodoRoutes.get('/',TodoController.getTodosPaginate)

module.exports=TodoRoutes