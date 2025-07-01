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
  authenticated,
  verifyRole("FREELANCER"),
  freelancerUpdateOrder
);
freelancerOrderRouter.get(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  getAllOrder
);

module.exports = freelancerOrderRouter;
