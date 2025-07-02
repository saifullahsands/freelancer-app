const {
  clientPlaceOrder,
  totalOrders,
} = require("../../controller/client/clientOrder.controller");
const clientOrderRouter = require("express").Router();

clientOrderRouter.post("/", clientPlaceOrder);
clientOrderRouter.get("/", totalOrders);

module.exports = clientOrderRouter;
