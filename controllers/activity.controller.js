const { Activity, User, Sequelize } = require("../models");
const sequelize = require("sequelize");

class ActivityController {
  static async add(req, res, next) {
    try {
      req.body.userId = req.user.id;
      await Activity.create(req.body).then((data) =>
        res
          .status(201)
          .json({ message: "Activity added successfully", Activity: data })
      );
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const activity = await Activity.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).json({
        message: "Activity updated successfully",
        Activity: activity[1][0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      console.log(req.query);
      let where = { userId: req.user.id };
      if (req.query) {
        if (req.query.completed) {
          where.completed = req.query.completed;
        }
        if (req.query.category) {
          where.category = req.query.category;
        }
      }

      let page = req.query.page ? req.query.page : 1;
      const activities = await Activity.findAndCountAll({
        offset: (page - 1) * 2,
        limit: 2,
        where,
        attributes: ["id", "name", "completed"],
      });

      if (!activities) {
        throw {
          status: 404,
          message: "Activities Not Found",
        };
      } else {
        res.status(200).json({ activities });
      }
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const activity = await Activity.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          as: "User",
          attributes: ["username"],
        },
      });
      if (!activity) {
        throw {
          status: 404,
          message: "Activity Not Found",
        };
      } else {
        if (activity.userId !== req.user.id) {
          throw {
            status: 403,
            message: "Forbidden",
          };
        } else {
          res.status(200).json({ activity });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    // res.send(req.params);
    try {
      const activity = await Activity.findOne({ where: { id: req.params.id } });
      if (!activity) {
        throw {
          status: 404,
          message: "Activity Not Found",
        };
      } else {
        if (activity.userId !== req.user.id) {
          throw {
            status: 403,
            message: "Forbidden",
          };
        } else {
          await activity.destroy();
          res.status(200).json({ message: "Activity has been deleted" });
        }
      }
      res.send(activity);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ActivityController;
