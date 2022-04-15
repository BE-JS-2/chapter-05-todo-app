const categoriesRoutes = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

categoriesRoutes.get('/',CategoryController.getAllCategories)

module.exports=categoriesRoutes