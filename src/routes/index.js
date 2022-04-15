const mainRoutes = require('express').Router()
const categoriesRoutes = require('./categoriesRoutes')
const authRoutes = require('./AuthRoutes')
const todoRoutes = require('./TodoRoutes')

//categories
mainRoutes.use('/api/categories',categoriesRoutes)

//auth
mainRoutes.use('/api/auth',authRoutes)

//todos
mainRoutes.use('/api/todos',todoRoutes)

module.exports=mainRoutes;