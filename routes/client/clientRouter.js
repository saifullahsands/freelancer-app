const {
  checkuserProfile,
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const clientDetailsRouter = require("./clientDetailsRouter");
const clientHomeScreenRouter = require("./clientHomeScreenRouter");
const clientRouter = require("express").Router();
const clientOrderRouter = require("./clientOrderRouter");
const clientReviewRouter=require("./clientReviewRouter")
clientRouter.use(
  "/details",
  authenticated,
  verifyRole("CLIENT"),
  checkuserProfile("verifiedEmail"),
  clientDetailsRouter
);
clientRouter.use(
  "/home",
  authenticated,
  verifyRole("CLIENT"),
  checkuserProfile("verifiedEmail"),
  checkuserProfile("isProfileCompleted"),
  clientHomeScreenRouter
);
clientRouter.use(
  "/order",
  authenticated,
  verifyRole("CLIENT"),
  checkuserProfile("isProfileCompleted"),
  clientOrderRouter
);

clientRouter.use(
  "/review",
  authenticated,
  verifyRole("CLIENT"),
  checkuserProfile("isProfileCompleted"),
  clientReviewRouter
);
module.exports = clientRouter;
