const {users} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    userSignUp : async(req,res,next) => {
        try {
            const user = await users.create({
                username: req.body.username,
                password: req.body.password
            })
            res.status(200).json({
                message:'success register'
            })
        } catch (error) {
            next(err)
        }
    },
    Userlogin : async(req,res,next) => {
        try {
            const user = await users.findOne({
                where: {
                    username: req.body.username
                }
            })
            if(!user) {
                throw {
                    status: 401,
                    message: 'invalid username or password'
                }
            }else{
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign({id: user.id, username: user.username}, 'plugin');
                    res.status(200).json({
                        message: 'Sign In Success',
                        token
                    })
                    console.log(token);
                }else{
                    throw{
                        status:401,
                        message: 'Invalid Username or Password'
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }
}