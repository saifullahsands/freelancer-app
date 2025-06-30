const rootRouter = require("express").Router();
const authRouter = require("./authRouter");
const clientRouter = require("./client/clientRouter");
const freelancerRouter=require("./freelance/freelancerRouter")
rootRouter.use("/auth", authRouter);
rootRouter.use("/client", clientRouter);
rootRouter.use("/freelancer", freelancerRouter);

module.exports = rootRouter;
