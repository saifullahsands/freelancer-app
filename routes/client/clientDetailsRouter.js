const clientDetailsRouter = require("express").Router();

const {
  createclientDetails,
  updatedClientDetails,
} = require("../../controller/client/clientDetails.controller");

clientDetailsRouter.post(
  "/",
  createclientDetails
);
clientDetailsRouter.patch(
  "/",
  updatedClientDetails
);

module.exports = clientDetailsRouter;
