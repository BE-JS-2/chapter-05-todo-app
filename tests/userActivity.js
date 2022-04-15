const { User, Activity } = require("../models");

// User.findAll({
//   include: {
//     model: Activity,
//     as: "Activity",
//   },
// })
//   .then((users) => console.log(users))
//   .catch((error) => console.log(error));

Activity.findAll({
  include: {
    model: User,
    as: "User",
  },
})
  .then((activities) => console.log(activities))
  .catch((error) => console.log(error));
