const freelancerDetailRouter = require("express").Router();
const {
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const {
  createFreelancerDetails,
  updateFreelancerDetails,
  updateFreelancerGig,
  updateGigCvImagePdf,
} = require("../../controller/freelancer/freelancerDetail.controller");

freelancerDetailRouter.post(
  "/details",
  authenticated,
  verifyRole("FREELANCER"),
  createFreelancerDetails
);
freelancerDetailRouter.patch(
  "/details",
  authenticated,
  verifyRole("FREELANCER"),
  updateFreelancerDetails
);
freelancerDetailRouter.patch(
  "/gig-details",
  authenticated,
  verifyRole("FREELANCER"),
  updateFreelancerGig
);
freelancerDetailRouter.patch(
  "/cv-update",
  authenticated,
  verifyRole("FREELANCER"),
  updateGigCvImagePdf
);

module.exports = freelancerDetailRouter;
