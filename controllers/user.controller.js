const { User } = require("../models");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");

class UserController {
  static register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      await User.create({
        username: username,
        password: bcrypt.hashSync(password, salt),
      });
      res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      if (!user) {
        throw {
          status: 401,
          message: "Invalid username or password",
        };
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id, name: user.username }, "key");
          res.status(200).json({
            message: "Login success",
            data: { token },
          });
          console.log(token);
        } else {
          throw {
            status: 401,
            message: "Invalid username or password",
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
