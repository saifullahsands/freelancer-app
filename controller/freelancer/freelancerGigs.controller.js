const freelancerGigServices = require("../../services/freelancer/freelancerGigService");
const { handleS3Upload, okResponse } = require("../../utils");

const addFreelancerGig = async (req, res, next) => {
  try {
    const { title, description, price, category, deliveryTime } = req.body;
    const userId = req.user.id;
    let cvImageOrPdf = null;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      cvImageOrPdf = await handleS3Upload(filename, req.file, folder);
    }

    const addgig = await freelancerGigServices.createFreelancerGig(
      userId,
      title,
      description,
      price,
      cvImageOrPdf || null,
      category,
      deliveryTime
    );
    okResponse(res, "gigs created successfully :: ", addgig);
  } catch (error) {
    console.log(`error in add freelancer gigs :: ${error.message}`);
    next(error);
  }
};

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
    const deletegigs=await freelancerGigServices.deleteGig(userId,gigId)
    okResponse(res,200,"gigs deleted successfully !!",deletegigs)
  } catch (error) {
    console.log(`error in delete freelancer gig :: ${error.message}`);
    next(error);
  }
};





module.exports={
    deletefreelancerGig,
    updateFreelancerGig,
    addFreelancerGig
}