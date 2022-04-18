const express = require("express");
const { register } = require("../controllers/user.controller");
const {
  registerUserValidationRules,
  validate,
} = require("../middlewares/validator");
const router = express.Router();

router.post("/", registerUserValidationRules(), validate, register);

module.exports = router;
