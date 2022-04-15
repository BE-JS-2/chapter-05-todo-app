const { check } = require("express-validator");
const { User } = require("../models");

class UserRule {
  static register = [
    check("username")
      .isLength({ min: 4 })
      .withMessage("Username must at least 4 character")
      .custom((value) => {
        return User.findOne({ where: { username: value } }).then((user) => {
          if (user) {
            return Promise.reject("Username already taken");
          }
        });
      })
      .custom((value) => {
        if (value.includes(" ")) {
          console.log("ok");
          throw new Error("Username cant contain space");
        }
        return true;
      })
      .notEmpty()
      .withMessage("Username is required"),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password Must Be at Least 8 Characters")
      .matches("[0-9]")
      .withMessage("Password Must Contain a Number")
      .matches("[A-Z]")
      .withMessage("Password Must Contain an Uppercase Letter")
      .trim()
      .escape(),
  ];

  static login = [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ];
}

module.exports = UserRule;
