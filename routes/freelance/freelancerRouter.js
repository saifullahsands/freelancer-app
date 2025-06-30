const freelancerDetailRouter = require("./freelancerDetailRouter");

const freelancerRouter=require("express").Router();


freelancerRouter.use("/details",freelancerDetailRouter)



module.exports=freelancerRouter