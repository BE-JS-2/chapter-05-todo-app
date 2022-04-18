const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { JWT_SECRET_KEY } = require("../config/config");

const authorization = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decoded = jwt.verify(req.headers.authorization, JWT_SECRET_KEY);
      const id = decoded.id;
      const username = decoded.username;

      const selectedUser = await User.findOne({
        attributes: ["id", "username"],
        where: {
          username: username,
          id: id,
        },
      });

      if (selectedUser) {
        req.user = selectedUser;
        next();
      } else {
        throw {
          status: 401,
          message: "Unauthorized User",
        };
      }
    } else {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization };
