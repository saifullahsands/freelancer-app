const rootRouter = require("express").Router();
const { authenticated, verifyRole } = require("../middleware/auth.middleware");
const authRouter = require("./authRouter");
const clientRouter = require("./client/clientRouter");
const freelancerRouter=require("./freelance/freelancerRouter")
rootRouter.use("/auth", authRouter);
rootRouter.use("/client", clientRouter);
rootRouter.use("/freelancer",authenticated,verifyRole("FREELANCER") ,freelancerRouter);

module.exports = rootRouter;
