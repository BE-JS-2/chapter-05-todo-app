const { User } = require('../models/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

class UserController {

  static async register (req, res, next) {
    console.log(req.body);
    await User.create(req.body)
    res.status(201).json({
      message: 'Successfully create user'
    });
  }

  static async login (req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username
        }
      })
  
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            id: user.id,
            username: user.name
          }, 'qweqwe')

          res.status(200).json({
            token,
          })
        } else {
          throw {
            status: 400,
            message: 'Invalid username or password'
          }
        }
      } else {
        throw {
          status: 400,
          message: 'Invalid username or password'
        }
      }
    } catch (err) {
      next(err)
    }
  }
}


module.exports = UserController