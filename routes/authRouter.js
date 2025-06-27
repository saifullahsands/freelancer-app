const {
  register,
  verifyEmailToken,
  resendEmailVerificationToken,
  verifyOtpForNewPassword,
  resendOtp,
  ForgetPassword,
  login,
  updateProfileImage,
} = require("../controller/auth.controller");
const { authenticated } = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware");
const authRouter = require("express").Router();

authRouter.post("/register", upload.single("profileImage"), register);
authRouter.patch("/verify-email", verifyEmailToken);
authRouter.patch("/resend-token", resendEmailVerificationToken);
authRouter.patch("/forget-password", ForgetPassword);
authRouter.patch("/verify-otp", verifyOtpForNewPassword);
authRouter.patch("/resend-otp", resendOtp);
authRouter.post("/login", login);

authRouter.patch("/update-profile", authenticated, updateProfileImage);

module.exports = authRouter;
