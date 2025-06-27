const rootRouter=require("express").Router()
const authRouter=require("./authRouter")

rootRouter.use("/auth",authRouter)

module.exports=rootRouter