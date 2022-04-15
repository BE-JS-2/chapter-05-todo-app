const router = require("express").Router();

const authRoute = require("./auth.route");
const todoRoute = require("./todo.route");

router.use("/auth", authRoute);
router.use("/todos", todoRoute);

router.use("/api", router);
// router.get('api/user/stat', (req, res) => res.status(200).json('ok'))
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
