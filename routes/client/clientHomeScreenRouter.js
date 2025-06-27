const {
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const {
  clientHomeScreen,
} = require("../../controller/client/clientHomeScreen.controller");

const clientHomeScreenRouter = require("express").Router();

clientHomeScreenRouter.get(
  "/",
  authenticated,
  verifyRole("CLIENT"),
  clientHomeScreen
);

module.exports = clientHomeScreenRouter;
