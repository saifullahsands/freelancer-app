const AuthService = require("../services/auth.service");
const {
  BadRequestError,
  passwordHash,
  okResponse,
  createEmailVerifiedToken,
  smtpServer,
  generateOtp,
  comparePassword,
  generateToken,
  handleS3Upload,
} = require("../utils");

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) {
      return BadRequestError(res, "user is already exist");
    }
    let profileImage = "https://shorturlhub.com/Tbdxz";
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      profileImage = await handleS3Upload(filename, req.file, folder);
    }
    const hashPassword = await passwordHash(password);
    const token = await createEmailVerifiedToken();
    const user = await AuthService.createUser(
      username,
      email,
      hashPassword,
      role,
      token,
      profileImage
    );
    await smtpServer(email, token, "Your email verification Token");

    okResponse(
      res,
      201,
      "Registration successful. Please check your email for verification ",
      user
    );
  } catch (error) {
    console.log(`error in register :: ${error.message}`);

    next(error);
  }
};

const resendEmailVerificationToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await AuthService.findUserByEmail(email);
    if (!existingUser) {
      return BadRequestError(res, "invalid credientials ");
    }
    if (existingUser.veirfiedEmail) {
      return BadRequestError(res, "user is already verified");
    }
    const token = await createEmailVerifiedToken();
    const VerifyToken = await AuthService.updateEmailVerifiedToken(
      existingUser.id,
      token
    );
    await smtpServer(email, token, "Your email verification Token");
    okResponse(
      res,
      200,
      "Please check your email for verification",
      VerifyToken.emailVerifiedToken
    );
  } catch (error) {
    console.log(
      `error in resend email verification token is :: ${error.message}`
    );
    next(error);
  }
};

const verifyEmailToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const verifiedToken = await AuthService.verifyEmailToken(token);
    okResponse(res, 200, "email verified successfully ", verifiedToken);
  } catch (error) {
    console.log(`error in verify email token  :: ${error.message}`);
    next(error);
  }
};

const ForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await AuthService.findUserByEmail(email);
    if (!existingUser) {
      return BadRequestError(res, "Invalid Credientials");
    }
    const otp = await generateOtp();
    const DbOtp = await AuthService.setAnOtp(existingUser.id, otp);
    await smtpServer(email, otp, "OTP Verification");
    okResponse(res, 200, "Otp sent on your email", DbOtp.otp);
  } catch (error) {
    console.log(`error in reset password  :: ${error.message}`);
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = await generateOtp();
    const existingUser = await AuthService.findUserByEmail(email);
    if (!existingUser) {
      return BadRequestError(res, "invalid credientials");
    }
    const DbOtp = await AuthService.setAnOtp(existingUser.id, otp);

    await smtpServer(email, otp, "OTP Verification");

    okResponse(res, 200, "Otp sent on your email", DbOtp.otp);
  } catch (error) {
    console.log(`error in resend Otp :: ${error}`);
    next(error);
  }
};

const verifyOtpForNewPassword = async (req, res, next) => {
  try {
    const { otp, Password } = req.body;
    const hashPassword = await passwordHash(Password);
    const verfyOtp = await AuthService.verifyOtpAndSetnewPassword(
      otp,
      hashPassword
    );

    if (!verfyOtp) {
      return BadRequestError(res, "invalid or expired Otp");
    }
    const otpExpiryTime = verfyOtp.updated_at.getTime() + 1 * 60 * 1000;

    if (Date.now() > otpExpiryTime) {
      return BadRequestError(res, "otp has expired");
    }
    okResponse(res, 200, "password has been successfully changed ");
  } catch (error) {
    console.log(
      `error in verify otp and reset new password :: ${error.message}`
    );
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await AuthService.findUserByEmail(email);
    if (!existingUser) {
      return BadRequestError(res, "Invalid credientials");
    }
    const matchPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!matchPassword) {
      return BadRequestError(res, "Invalid credientials");
    }

    const token = await generateToken(existingUser.id);
    okResponse(res, 200, "user logged In successfully ||", existingUser, token);
  } catch (error) {
    console.log(`error in login :: ${error.message}`);
    next(error);
  }
};

const updateProfileImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const folder = "testing";
      const profileImage = await handleS3Upload(filename, req.file, folder);
      await AuthService.updatedProfileImage(userId, profileImage);
      okResponse(res, 200, "update profile image ", null);
    }
    okResponse(res, 200, "no profile updated", null);
  } catch (error) {
    console.log(`error in update Profile Image :: ${error.message}`);
    next(error);
  }
};
module.exports = {
  register,
  resendEmailVerificationToken,
  verifyEmailToken,
  ForgetPassword,
  resendOtp,
  verifyOtpForNewPassword,
  login,
  updateProfileImage,
  updateProfileImage,
};
