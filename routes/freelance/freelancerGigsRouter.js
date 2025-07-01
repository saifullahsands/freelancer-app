const {
  authenticated,
  verifyRole,
} = require("../../middleware/auth.middleware");
const upload=require("../../middleware/multer.middleware")
const {
  deletefreelancerGig,
  updateFreelancerGig,
  addFreelancerGig,
} = require("../../controller/freelancer/freelancerGigs.controller");

const freelancerGigsRouter = require("express").Router();

freelancerGigsRouter.post(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  upload.single("cv"),
  addFreelancerGig
);
freelancerGigsRouter.patch(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
    upload.single("cv"),
  updateFreelancerGig
);
freelancerGigsRouter.delete(
  "/",
  authenticated,
  verifyRole("FREELANCER"),
  
  deletefreelancerGig
);

module.exports = freelancerGigsRouter;
