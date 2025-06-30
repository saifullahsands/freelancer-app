const JWT = require("jsonwebtoken");
const {
  unAuthorizedError,
  ForbiddenError,
  BadRequestError,
} = require("../utils");
const { TOKEN_SECRET_KEY } = require("../config/env.config");
// const { findUserById } = require("../services/auth.service");
const AuthService = require("../services/auth.service");

async function authenticated(req, res, next) {
  try {
    const authHeader = req.headers["authorization"] || req.headers;
    if (
      !authHeader ||
      typeof authHeader !== "string" ||
      !authHeader.startsWith("Bearer ")
    ) {
      return unAuthorizedError(res, "token is not found or malformed");
    }
    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, TOKEN_SECRET_KEY);
    const user = await AuthService.findUserById(decoded.id);
    if (!user) {
      return unAuthorizedError(res, "user is not found");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JWT.JsonWebTokenError) {
      return unAuthorizedError(res, "Invalid Token");
    } else if (error instanceof JWT.TokenExpiredError) {
      return unAuthorizedError(res, "Token is expired");
    } else {
      console.log(`error in auth middleware  :: ${error.message}`);
      next(error);
    }
  }
}

function verifyRole(Role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== Role) {
      return ForbiddenError(res, `this route can only ${Role} access`);
    }
    next();
  };
}

function checkuserProfile(checking) {
  return (req, res, next) => {
    try {
      if (checking === "isProfileCompleted" && !req.user.isProfileCompleted) {
        return BadRequestError(res, "first you completed a profile");
      }
      if (checking === "verifiedEmail" && !req.user.veirfiedEmail) {
        return BadRequestError(res, "first you verified your email thank you");
      }
      next();
    } catch (error) {
      console.log(`error in checking profile :: ${error.message}`);
      next(error);
    }
  };
}

module.exports = {
  authenticated,
  verifyRole,
  checkuserProfile,
};
