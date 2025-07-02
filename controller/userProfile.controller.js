const { useId } = require("react");
const authService = require("../services/auth.service");
const profileServices = require("../services/profileServices");
const {
  handleS3Upload,
  BadRequestError,
  passwordHash,
  okResponse,
} = require("../utils");

const updateProfileImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let profileImage;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      profileImage = await handleS3Upload(filename, req.file, folder);
      await profileServices.updateProfileImage(userId, profileImage);
      return okResponse(res, 200, "Profile image updated", updatedUser);
    } else {
      return okResponse(
        res,
        200,
        "No image uploaded, existing image remains",
        findUser
      );
    }
  } catch (error) {
    console.log(`error in update profile Image :: ${error.message}`);
    next();
  }
};

const getOwnProfiledetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userProfile = await profileServices.getOwnProfile(userId);

    okResponse(res, 200, " user info get successfully :: ", userProfile);
  } catch (error) {
    console.log(`error in get Own Profile :: ${error.message}`);
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { newpassword } = req.body;
    const hashPassword = await passwordHash(newpassword);
    await profileServices.updatePasword(useId, hashPassword);
    okResponse(res, 200, " password changed", null);
  } catch (error) {
    console.log(`error in change password :: ${error.message}`);
    next(error);
  }
};

module.exports = {
  updateProfileImage,
  getOwnProfiledetails,
  changePassword,
};
