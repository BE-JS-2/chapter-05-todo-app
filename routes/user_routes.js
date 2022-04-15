const express = require("express");
const UserController = require("../controllers/user_controller");
const { body, validationResult } = require("express-validator");
const userRouter = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        message: errors.array(),
      });
    } else {
      next();
    }
  };

userRouter.post(
  "/reg-user",
  [body("name").notEmpty(), body("password").notEmpty()],
  validate,
  UserController.addUser
);
userRouter.post(
  "/login",
  [body("name").notEmpty(), body("password").notEmpty()],
  validate,
  UserController.login
);

module.exports = userRouter;
