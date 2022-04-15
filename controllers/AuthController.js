require('dotenv').config();
const bcrypt = require('bcrypt');
const res    = require('express/lib/response');
const jwt    = require('jsonwebtoken');

const { validationResult }   = require('express-validator');
const {
  JWT_SECRET_KEY,
  JWT_TIME_EXPIRED
} = process.env;
// Model
const { User, Profile } = require('../models');
// Error
const { Api400Error, Api404Error, Api422Error } = require('../middleware/APIError');

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, password, name, age } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Api422Error(errors.array())
      }
      await User.create({
        username,
        password: bcrypt.hashSync(password, 10),
        profile: {
          name, age
        }
      }, {
        include: {
          model: Profile,
          as: 'profile'
        }
      })
      .then(data => {
        return res.status(201).json({
          success: true,
          message: 'user successfully registered',
          data: {
            username: data.username
          }
        })
      })
      .catch(error => {
        console.log(error.message);
        if (error.name == "SequelizeValidationError") {
          throw new Api422Error("validation error, check all field !")
        } else {
          throw new Api400Error(error.message)
        }
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Api422Error(errors.array())
      }

      await User.findOne({
        where: { username }
      })
      .then(data => {
        if (data == null) {
          throw new Api400Error('wrong username');
        }
        bcrypt.compare(password, data.password, (err, pass) => {
          if (err) throw new Api400Error(err.message);

          if (pass) {
            const token = jwt.sign({ id: data.id }, JWT_SECRET_KEY, { expiresIn: JWT_TIME_EXPIRED });
            return res.status(201).json({
              success: true,
              message: 'user successfully login',
              token
            })
          } else {
            throw new Api400Error('wrong password')
          }
        })
      })
      .catch(error => {
        throw new Api400Error(error.message);
      })
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = AuthController;