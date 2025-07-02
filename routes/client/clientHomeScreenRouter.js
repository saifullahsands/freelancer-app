
const {
  clientHomeScreen,
  searchFreelancerByGigTitleAndDescription,
} = require("../../controller/client/clientHomeScreen.controller");

const clientHomeScreenRouter = require("express").Router();

clientHomeScreenRouter.get(
  "/all-freelancer",
clientHomeScreen
);

clientHomeScreenRouter.get(
  "/search-freelancer",
  searchFreelancerByGigTitleAndDescription
);
module.exports = clientHomeScreenRouter;
