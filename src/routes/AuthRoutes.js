const authRoutes = require('express').Router()
const AuthController = require('../controllers/AuthController')

authRoutes.post('/sign-in', AuthController.Userlogin)
authRoutes.post('/sign-up', AuthController.userSignUp)

module.exports=authRoutes