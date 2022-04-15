const UserController = require("../controllers/user.controller");
const validate = require("../validation/validator");
const UserRule = require("../validation/user.rule");
const router = require("express").Router();

router.post("/", validate(UserRule.register), UserController.register);
router.get("/", validate(UserRule.login), UserController.login);

module.exports = router;
