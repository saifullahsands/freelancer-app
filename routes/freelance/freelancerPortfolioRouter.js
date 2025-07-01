const {
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const {
  uploadPortfoliodetails,
  deletePortfolioDetails,
  getAllPortfolio,
} = require("../../controller/freelancer/freelancerPortfilio.controller");
const upload=require("../../middleware/multer.middleware")
const freelancerPortfolioRouter = require("express").Router();

freelancerPortfolioRouter.post(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  upload.single("media"),
  uploadPortfoliodetails
);
freelancerPortfolioRouter.get(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  getAllPortfolio
);
freelancerPortfolioRouter.delete(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  deletePortfolioDetails
);

module.exports = freelancerPortfolioRouter;
