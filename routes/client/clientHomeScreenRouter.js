const {
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const {
  clientHomeScreen,
  searchFreelancerByGigTitleAndDescription,
} = require("../../controller/client/clientHomeScreen.controller");

const clientHomeScreenRouter = require("express").Router();

clientHomeScreenRouter.get(
  "/all-freelancer",
  authenticated,
  verifyRole("CLIENT"),
  clientHomeScreen
);

clientHomeScreenRouter.get(
  "/search-freelancer",
  authenticated,
  verifyRole("CLIENT"),
  searchFreelancerByGigTitleAndDescription
);
module.exports = clientHomeScreenRouter;
