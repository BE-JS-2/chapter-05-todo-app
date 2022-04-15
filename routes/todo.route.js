const TodoController = require("../controllers/todo.controller");
const validate = require("../validation/validator");
const TodoRule = require("../validation/todo.rule");
const auth = require("../middlewares/auth");
const router = require("express").Router();

router.get("/", [auth], TodoController.findAll);
router.get("/:id", [auth], TodoController.findOne);
router.post("/", validate(TodoRule.create), TodoController.create);
router.put("/:id", [auth, validate(TodoRule.update)], TodoController.update);
router.delete("/:id", [auth], TodoController.delete);

module.exports = router;
