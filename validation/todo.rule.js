const { check, body } = require("express-validator");
const { Category } = require("../models");

class TodoRule {
  static create = [
    check("name").notEmpty().withMessage("Name is required"),
    check("completed").notEmpty().withMessage("Completed is required"),
    check("dueDate")
      .notEmpty()
      .withMessage("Due date is required")
      .isAfter(new Date().toString())
      .withMessage("Due date must be greater than today"),
    check("categoryId")
      .notEmpty()
      .withMessage("Category id is required")

      .custom((value) => {
        return Category.findOne({ where: { id: value } }).then((cat) => {
          if (!cat) {
            return Promise.reject("Invalid category id");
          }
        });
      }),
  ];

  static update = [
    check("categoryId")
      .if(body("categoryId").exists())
      .custom((value) => {
        return Category.findOne({ where: { id: value } }).then((cat) => {
          if (!cat) {
            return Promise.reject("Invalid category id");
          }
        });
      }),
    check("dueDate")
      .if(body("categoryId").exists())
      .isAfter(new Date().toString())
      .withMessage("Due date must be greater than today"),
  ];
}

module.exports = TodoRule;
