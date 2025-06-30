
const clientDetailsRouter=require("./clientDetailsRouter")
const clientHomeScreenRouter = require("./clientHomeScreenRouter")
const clientRouter=require("express").Router()
const clientOrderRouter=require("./clientOrderRouter")
clientRouter.use("/details",clientDetailsRouter)
clientRouter.use("/home",clientHomeScreenRouter)
clientRouter.use("/order",clientOrderRouter)
 module.exports=clientRouter