const { authenticated, verifyRole } = require("../../middleware/auth.middleware");
const {clientPlaceOrder }=require("../../controller/client/clientOrder.controller")
const clientOrderRouter=require("express").Router();



clientOrderRouter.post("/",authenticated,verifyRole("CLIENT"),clientPlaceOrder)

module.exports=clientOrderRouter