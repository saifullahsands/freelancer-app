const freelancerPortfolioService = require("../../services/freelancer/freelancerPortfolioService");
const { BadRequestError, handleS3Upload, okResponse } = require("../../utils");

const uploadPortfoliodetails = async (req, res, next) => {
  try {
    const { title, descriptions } = req.body;
    const freelancerId = req.user.id;
    let filesUrl = null;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      filesUrl = await handleS3Upload(filename, req.file, folder);
    }

    const portfolio = await freelancerPortfolioService.creatPortfolio(
      freelancerId,
      title,
      descriptions,
      filesUrl
    );
    okResponse(res, 200, "upload portfolio details ::", portfolio);
  } catch (error) {
    console.log(`errorr in upload portfolio details :: ${error.message}`);
    next(error);
  }
};

const getAllPortfolio = async (req, res, next) => {
  try {
    const freelancerId = req.user.id;
    const getportfolio = await freelancerPortfolioService.getAllPortfolio(
      freelancerId
    );
    okResponse(res, 200, "get all portfolios  ", getportfolio);
  } catch (error) {
    console.log(`error in get all portfolio :: ${error.message}`);
    next(error);
  }
};

const deletePortfolioDetails = async (req, res, next) => {
  try {
    const freelancerId = req.user.id;
    const { portfolioId } = req.body;
    const findport = await freelancerPortfolioService.findPortfolio(
      portfolioId,
      freelancerId
    );
    if (!findport) {
      return BadRequestError(res, "you are not owner of this portfolio");
    }
    const deletePort = await freelancerPortfolioService.deletePortfolio(
      portfolioId
    );
    okResponse(res, 200, " ", deletePort);
  } catch (error) {
    console.log(`error in delete portfolio detauls :: ${error.message}`);
    next(error);
  }
};

module.exports = {
  uploadPortfoliodetails,
  getAllPortfolio,
  deletePortfolioDetails,
};
