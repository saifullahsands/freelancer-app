const authService = require("../../services/auth.service");
const clientDetails = require("../../services/clients/clientDetails");
const { okResponse } = require("../../utils");

const createclientDetails = async (req, res, next) => {
  try {
    const { bio, address, city, state, gender } = req.body;
    const userId = req.user.id;
    await clientDetails.createClientDetails(
      userId,
      bio,
      address,
      city,
      state,
      gender
    );
    await authService.updatedUserProfileFlag(userId)
    okResponse(res, 200, "client details updated successfully !!", null);
  } catch (error) {
    console.log(`error in create clients details :: ${error.message}`);
    next(error);
  }
};

const updatedClientDetails = async (req, res, next) => {
  try {
    const { bio, address, city, state } = req.body;
    const userId = req.user.id;
    await clientDetails.updateClientDetails(userId, bio, address, city, state);
    okResponse(res, 200, "client details updated successfully !! ", null);
  } catch (error) {
    console.log(`error in update client details :: ${error.message}`);
    next(error);
  }
};

module.exports = {
  updatedClientDetails,
  createclientDetails,
};
