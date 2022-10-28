const userRouter = require("express").Router();
const userRoute = require("../controllers/UserRoute");
const verifiedUser = require("../middlewares/VerifyToken");

//  find user By id
userRouter.route("/find/:id").get(verifiedUser, userRoute.FindUserById);

// find all user
userRouter.route("/").get(verifiedUser, userRoute.FindAllUser);

// Stats routes
userRouter.route("/stats").get(userRoute.FindStats);

// update username email ,password
userRouter
  .route("/:id")
  .patch(verifiedUser, userRoute.UpdateById)
  .delete(verifiedUser, userRoute.DeleteById);

module.exports = userRouter;
