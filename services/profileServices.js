const prisma = require("../prismaClient");

class profileServices {
  async updateProfileImage(userId, profileImage) {
    return await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        profileImage: profileImage,
      },
    });
  }

  async getOwnProfile(userId) {
    return await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        username,
        password,
        email,
        userDetails: true,
        userGig: true,
        portfolio: true,
        clientOrders: true,
      },
    });
  }

  async updatePasword(userId,newPassword){
    return await prisma.user.update({
        where:{
            id:parseInt(userId),
        },
        data:{
            password:newPassword
        }

    })
  }
}

module.exports = new profileServices();
