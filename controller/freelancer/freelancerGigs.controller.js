const freelancerGigServices = require("../../services/freelancer/freelancerGigService");
const { handleS3Upload, okResponse, BadRequestError } = require("../../utils");

const updateFreelancerGig = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { gigId, title, description, deliveryTime, category } = req.body;
    let cvImageOrPdf = null;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      cvImageOrPdf = await handleS3Upload(filename, req.file, folder);
    }
    const updategig = await freelancerGigServices.updateGig(
      userId,
      gigId,
      title,
      description,
      deliveryTime,
      category,
      cvImageOrPdf
    );
    okResponse(res, 200, "updated gigs successfully ", updategig);
  } catch (error) {
    console.log(`error in update freelancer gig :: ${error.message}`);
    next(error);
  }
};

const deletefreelancerGig = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { gigId } = req.body;
    const findingGig = await freelancerGigServices.findGig(userId, gigId);
    if (!findingGig) {
      return BadRequestError(res, "you are not a owner of this gig");
    }
    await freelancerGigServices.deleteGig(gigId);
    okResponse(res, 200, "gigs deleted successfully !!");
  } catch (error) {
    console.log(`error in delete freelancer gig :: ${error.message}`);
    next(error);
  }
};

const addingGigs = async (req, res, next) => {
  try {
    const { title, description, price, category, deliveryTime } = req.body;
    const userId = req.user.id;
    let cvImageOrPdf = null;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      cvImageOrPdf = await handleS3Upload(filename, req.file, folder);
    }
    const addgig = await freelancerGigServices.addingGigs(
      userId,
      title,
      description,
      price,
      category,
      deliveryTime,
      cvImageOrPdf
    );
    okResponse(res, 200, "adding gigs ",addgig);
  } catch (error) {
    console.log(`error in adding Gigs :; ${error.message}`);
    next(error);
  }
};

module.exports = {
  deletefreelancerGig,
  updateFreelancerGig,
  addingGigs
};
