const { Users } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
   static async register (req, res) {
      const user = await Users.create({
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password
      })

      res.status(201).json({
        message: 'Successfully create user'
      })
   }

   static async login (req, res, next) {
    try {
      const user = await Users.findOne({
        where: {
          username: req.body.username
        }
      })
      if (!user) {
        throw {
          status: 401,
          message: 'Invalid username or password'
        }
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // mengeluarkan token
          let token = jwt.sign({ id: user.id, username: user.username }, 'qweqwe');
          res.status(200).json({
            message: 'Login success',
            token,
          })
          console.log(token)
        } else {
          throw {
            status: 401,
            message: 'Invalid username or password'
          }
        }
      }
     } catch (error) {
      next(error);
     }
    // masukkan username dan password
    // cek apakah username ada di database, kalau ada, lanjut proses selanjutnya, kalau misalnya username
    // tidak ada di database, maka error (tidak bisa dapat token)
    // username ada di database => mencocokan password, kalau cocok dapet token, kalau tidak, tidak bisa masuk (tidak dapat token)
   }
};

module.exports = UserController;