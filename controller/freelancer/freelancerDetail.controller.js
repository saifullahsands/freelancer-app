const { BadRequestError, handleS3Upload, okResponse } = require("../../utils");
const Freelancer_Details = require("../../services/freelancer/freelancerDetails");
const AuthService = require("../../services/auth.service");

// freelancer
const createFreelancerDetails = async (req, res, next) => {
  try {
    const { address, city, state, bio, gender, title, description, price } =
      req.body;
    const price1 = parseFloat(price);
    console.log("Price :; ", typeof price1);
    const userId = req.user.id;
    if (!req.file) {
      return BadRequestError(res, "cvImage or pdf file is required");
    }

    const filename = `${Date.now()}_${req.file.originalname}`;
    const folder = "testing";
    const cvImageOrPdf = await handleS3Upload(filename, req.file, folder);

    await Freelancer_Details.createFreelanceGig(
      userId,
      title,
      description,
      price,
      cvImageOrPdf
    );
    await Freelancer_Details.createFreelancerDetail(
      userId,
      address,
      city,
      state,
      bio,
      gender
    );
    await AuthService.updatedUserProfileFlag(userId);
    okResponse(res, 200, "created freelancer details successfully !!", null);
  } catch (error) {
    console.log(`error in create user details :: ${error.message}`);
    next(error);
  }
};

const updateFreelancerDetails = async (req, res, next) => {
  try {
    const { address, city, state, bio } = req.body;

    const userId = req.user.id;
    const updateDetails = await Freelancer_Details.updateFrrelancerDetail(
      userId,
      address,
      city,
      state,
      bio
    );
    okResponse(
      res,
      200,
      "freelancer details updated successfully !!",
      updateDetails
    );
  } catch (error) {
    console.log(`error in update details :: ${error.message}`);
    next(error);
  }
};

const updateFreelancerGig = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const userId = req.user.id;
    await Freelancer_Details.updateFreelancerGig(
      userId,
      title,
      description,
      price
    );
    okResponse(res, 200, "freelancer gig updated successfully !!", null);
  } catch (error) {
    console.log(`error in update freelancer gig :: ${error.message}`);
    next(error);
  }
};

const updateGigCvImagePdf = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      const cvImageOrPdf = await handleS3Upload(filename, req.file, folder);
      const updateCV = await Freelancer_Details.updateCvImageOrPdf(
        userId,
        cvImageOrPdf
      );
      return okResponse(res, 200, "upadted Cv Image successfully !!", null);
    }
    okResponse(res, 200, "No file upload Existing Cv kept unchanged ", null);
  } catch (error) {
    console.log(`error in update gig cv Image Pdf :: ${error.message}`);
    next(error);
  }
};
module.exports = {
  updateFreelancerDetails,
  createFreelancerDetails,
  updateFreelancerGig,
  updateGigCvImagePdf,
};
