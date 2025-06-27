const { token } = require("morgan");
const prisma = require("../prismaClient");
const { BadRequestError } = require("../utils");

class AuthService {
  async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findUserById(userId){
    return await prisma.user.findUnique({
      where:{
        id:parseInt(userId)
      }
    })
  }
  async createUser(username, email, password, role, token, profileImage) {
    return await prisma.user.create({
      data: {
        username,
        email,
        password,
        role,
        emailVerifiedToken: token,
        profileImage,
      },
    });
  }
  async updateEmailVerifiedToken(userId, token) {
    return await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        emailVerifiedToken: token,
      },
    });
  }

  async verifyEmailToken(token) {
    const user = await prisma.user.findFirst({
      where: {
        emailVerifiedToken: token,
      },
    });
    if (!user) {
      return BadRequestError(resizeBy, "invalid or expired Token");
    }
    if (user.veirfiedEmail) {
      return BadRequestError(res, "email is already verified");
    }
    return await prisma.user.update({
      where: {
        id: parseInt(user.id),
      },
      data: {
        emailVerifiedToken: null,
        emailVerifiedTime: new Date(),
        veirfiedEmail: true,
      },
    });
  }

  async setAnOtp(userId, otp1) {
    const otp = otp1.toString();
    return await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        otp: otp,
      },
    });
  }

  async verifyOtpAndSetnewPassword(otp1, newPassword) {
    const otp = otp1.toString();
    return await prisma.user.findFirst({
      where: {
        otp: otp,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async resetOtp(userId) {
    return await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        otp: null,
      },
    });
  }

  async updatedProfileImage(userId, profileImage) {
    return await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        profileImage: profileImage,
      },
    });
  }
}

module.exports = new AuthService();
