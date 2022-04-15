const { validationResult } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static async addUser(req, res, next) {
    try {
      const { name, password } = req.body;
      const user = await User.create({
        name,
        password,
      });
      if (user === null)
        throw {
          status: 400,
          message: "Bad request",
        };
      res.status(201).json({
        message: "Succesfully create user",
        name: user.name,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { name, password } = req.body;
      const user = await User.findOne({
        where: {
          name,
        },
      });
      if (user === null)
        throw {
          status: 401,
          message: "Invalid user or password",
        };

      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid)
        throw {
          status: 401,
          message: "Invalid user or password",
        };
      const token = jwt.sign({ id: user.id, name: user.name }, 'krabby patty');
      res.status(200).json({
        message: "Login success",
        "Your token": token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
