const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
const port = 3000;
const { User, Activity } = require("./models");
const UserController = require("./controllers/user.controller");
const ActivityController = require("./controllers/activity.controller");
const errorHandler = require("./utils/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .custom((value) => {
        return User.findOne({
          where: {
            email: value,
          },
        }).then((User) => {
          if (User) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
    body("username")
      .notEmpty()
      .custom((value) => {
        return User.findOne({
          where: {
            username: value,
          },
        }).then((User) => {
          if (User) {
            return Promise.reject("Username already in use");
          }
        });
      }),
    body("password").notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        message: errors,
      });
    } else {
      next();
    }
  },
  UserController.register
);

app.post(
  "/login",
  [body("username").notEmpty(), body("password").notEmpty()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        message: errors,
      });
    } else {
      next();
    }
  },
  UserController.login
);

app.use(UserController.authorization);

app.post(
  "/activities",
  [
    body("name").notEmpty(),
    body("due_date")
      .notEmpty()
      .custom((value) => {
        if (!(new Date(value) > new Date())) {
          return Promise.reject("Wrong Date");
        }
        return value;
      }),
    body("category").notEmpty(),
    body("completed").notEmpty().isBoolean(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        message: errors,
      });
    } else {
      next();
    }
  },
  ActivityController.add
);

app.put("/activities/:id", [
  [
    body("name").notEmpty(),
    body("due_date")
      .notEmpty()
      .custom((value) => {
        if (!(new Date(value) > new Date())) {
          return Promise.reject("Wrong Date");
        }
        return value;
      }),
    body("category").notEmpty(),
    body("completed").notEmpty().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next({
          status: 400,
          message: errors,
        });
      } else {
        const activity = await Activity.findOne({
          where: { id: req.params.id },
        });
        if (!activity) {
          throw {
            status: 404,
            message: "Activity Not Found",
          };
        } else {
          if (activity.userId !== Number(req.user.id)) {
            throw {
              status: 403,
              message: "Forbidden",
            };
          }
          next();
        }
      }
    } catch (error) {
      next(error);
    }
  },
  ActivityController.update,
]);

app.get("/activities", ActivityController.list);
app.get("/activities/:id", ActivityController.detail);
app.delete("/activities/:id", ActivityController.delete);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
