const { body, validationResult } = require("express-validator");
const { User, Category } = require("../models");

const registerUserValidationRules = () => {
  return [
    body("username", "value not found")
      .notEmpty()
      .custom(
        (isUniqueUsername = async (username) => {
          const isExist = await User.findOne({
            where: {
              username: username,
            },
          });
          if (isExist) {
            throw new Error("already in use");
          }
        })
      ),
    body("password", "value not found").notEmpty(),
    body("birthdate", "value not found").notEmpty(),
    body("gender", "value not found").notEmpty(),
  ];
};

const addTodoValidationRules = () => {
  return [
    body("name", "value not found").notEmpty(),
    body("description", "value not found").notEmpty(),
    body("dueDate", "value not found")
      .notEmpty()
      .custom(
        (isValidDueDate = async (dueDate) => {
          if (new Date(dueDate) < new Date()) {
            throw new Error("should be greater than today");
          }
        })
      ),
    body("categoryId", "value not found")
      .notEmpty()
      .custom(
        (isExistCategory = async (categoryId) => {
          const category = await Category.findOne({
            where: {
              id: categoryId,
            },
          });

          if (!category) {
            throw new Error("not available");
          }
        })
      ),
    body("completed", "value not found").notEmpty(),
  ];
};

const updateTodoValidationRules = () => {
  return [
    body("name", "value not found").optional().notEmpty(),
    body("description", "value not found").optional().notEmpty(),
    body("dueDate", "value not found")
      .optional()
      .notEmpty()
      .custom(
        (isValidDueDate = async (dueDate) => {
          if (new Date(dueDate) < new Date()) {
            throw new Error("should be greater than today");
          }
        })
      ),
    body("categoryId", "value not found")
      .optional()
      .notEmpty()
      .custom(
        (isExistCategory = async (categoryId) => {
          const category = await Category.findOne({
            where: {
              id: categoryId,
            },
          });

          if (!category) {
            throw new Error("not available");
          }
        })
      ),
    body("completed", "value not found").optional().notEmpty(),
  ];
};

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const extractedErrors = [];
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));

      throw {
        status: 422,
        message: extractedErrors,
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validate,
  registerUserValidationRules,
  addTodoValidationRules,
  updateTodoValidationRules,
};
