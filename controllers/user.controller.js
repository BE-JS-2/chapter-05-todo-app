const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");

const register = async (req, res, next) => {
  await User.create(req.body);
  res.status(201).json({ message: "User created successfully" });
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "username", "password"],
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET_KEY
        );
        res.status(200).json({
          token,
        });
      } else {
        throw {
          status: 400,
          message: "Invalid username or password",
        };
      }
    } else {
      throw {
        status: 400,
        message: "Invalid username or password",
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
