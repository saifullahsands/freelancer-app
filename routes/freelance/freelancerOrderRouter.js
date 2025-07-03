const {
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const {
  freelancerUpdateOrder,
  getAllOrder,
} = require("../../controller/freelancer/freelancerOrder.controller");
const freelancerOrderRouter = require("express").Router();

freelancerOrderRouter.patch(
  "/",
  freelancerUpdateOrder
);
freelancerOrderRouter.get(
  "/",
  getAllOrder
);

module.exports = freelancerOrderRouter;
