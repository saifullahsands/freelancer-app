const {
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const {
  clientPlaceOrder,
  totalOrders,
} = require("../../controller/client/clientOrder.controller");
const clientOrderRouter = require("express").Router();

clientOrderRouter.post(
  "/",
  authenticated,
  verifyRole("CLIENT"),
  clientPlaceOrder
);
clientOrderRouter.get("/", authenticated, verifyRole("CLIENT"), totalOrders);

module.exports = clientOrderRouter;
