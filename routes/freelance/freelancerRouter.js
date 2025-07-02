const { checkuserProfile } = require("../../middleware/auth.middleware");
const freelancerDetailRouter = require("./freelancerDetailRouter");
const freelancerGigsRouter = require("./freelancerGigsRouter");
const freelancerRouter = require("express").Router();
const freelancerOrderRouter = require("./freelancerOrderRouter");
const freelancerPortfolioRouter = require("./freelancerPortfolioRouter");

freelancerRouter.use(
  "/details",
  checkuserProfile("verifiedEmail"),
  freelancerDetailRouter
);
freelancerRouter.use(
  "/gig",
  checkuserProfile("isProfileCompleted"),
  freelancerGigsRouter
);
freelancerRouter.use(
  "/order",
  checkuserProfile("isProfileCompleted"),
  freelancerOrderRouter
);
freelancerRouter.use(
  "/portfolio",
  checkuserProfile("isProfileCompleted"),
  freelancerPortfolioRouter
);

module.exports = freelancerRouter;
