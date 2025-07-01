const freelancerDetailRouter = require("express").Router();
const {
  authenticated,
  verifyRole,
  checkuserProfile,
} = require("../../middleware/auth.middleware");
const {
  createFreelancerDetails,
  updateFreelancerDetails,

} = require("../../controller/freelancer/freelancerDetail.controller");
const upload = require("../../middleware/multer.middleware");

freelancerDetailRouter.post(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  checkuserProfile("verifiedEmail"),
  upload.single("cv"),
  createFreelancerDetails
);
freelancerDetailRouter.patch(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  updateFreelancerDetails
);

module.exports = freelancerDetailRouter;
