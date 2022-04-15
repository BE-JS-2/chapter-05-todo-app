const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
// const bcry
class UserController {
  static async login(req, res, next) {
    // res.send(req.body);
    try {
      const user = await User.findOne({
        where: { username: req.body.username },
      });
      if (!user) {
        throw {
          status: 404,
          message: "Invalid Username Or Password",
        };
      } else {
        if (!bcryptjs.compareSync(req.body.password, user.password)) {
          throw {
            status: 404,
            message: "Invalid Username Or Password",
          };
        } else {
          let token = jwt.sign(
            { id: user.id, username: user.username },
            "IndonesiaRaya1945",
            { expiresIn: "1h" }
          );
          user.token = token;
          await user.save();
          res.status(200).json({ message: "Login Successfully", token });
        }
      }
      //   res.send(user);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      // res.send(req.body);
      const user = await User.create(req.body);
      res.status(201).json({ message: "User added successfully", user });
    } catch (error) {
      next(error);
    }
  }

  static async authorization(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw {
          status: 401,
          message: "Unauthorized Request",
        };
      } else {
        jwt.verify(
          req.headers.authorization,
          "IndonesiaRaya1945",
          function (err, user) {
            if (err) {
              throw {
                status: 401,
                message: "Unauthorized : Your Token is Invalid",
                err,
              };
            } else {
              req.user = { id: user.id, username: user.username };
            }
          }
        );
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
