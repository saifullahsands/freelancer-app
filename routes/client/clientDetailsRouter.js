const clientDetailsRouter = require("express").Router();
const {
  authenticated,
  verifyRole,
  checkuserProfile,
} = require("../../middleware/auth.middleware");
const {
  createclientDetails,
  updatedClientDetails,
} = require("../../controller/client/clientDetails.controller");

clientDetailsRouter.post(
  "/",
  authenticated,
  verifyRole("CLIENT"),
  checkuserProfile("verifiedEmail"),
  createclientDetails
);
clientDetailsRouter.patch(
  "/",
  authenticated,
  verifyRole("CLIENT"),
  checkuserProfile("verifiedEmail"),
  updatedClientDetails
);

module.exports = clientDetailsRouter;
