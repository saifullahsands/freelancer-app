const freelancerDetailRouter = require("./freelancerDetailRouter");
const freelancerGigsRouter = require("./freelancerGigsRouter");
const freelancerRouter = require("express").Router();
const freelancerOrderRouter = require("./freelancerOrderRouter");
const freelancerPortfolioRouter = require("./freelancerPortfolioRouter");

freelancerRouter.use("/details", freelancerDetailRouter);
freelancerRouter.use("/gig", freelancerGigsRouter);
freelancerRouter.use("/order", freelancerOrderRouter);
freelancerRouter.use("/portfolio", freelancerPortfolioRouter);

module.exports = freelancerRouter;
