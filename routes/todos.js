const express = require("express");
const {
  list,
  getById,
  add,
  update,
  remove,
} = require("../controllers/todo.controller");
const {
  addTodoValidationRules,
  validate,
  updateTodoValidationRules,
} = require("../middlewares/validator");
const router = express.Router();

router.get("/", list);
router.get("/:id", getById);
router.post("/", addTodoValidationRules(), validate, add);
router.put("/:id", updateTodoValidationRules(), validate, update);
router.delete("/:id", remove);

module.exports = router;
