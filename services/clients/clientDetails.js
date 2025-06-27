const prisma = require("../../prismaClient");

class clientDetails {
  async createClientDetails(userId, bio, address, city, state, gender) {
    return await prisma.user_Detail.create({
      data: {
        userId: parseInt(userId),
        bio,
        address,
        city,
        state,
        gender,
      },
    });
  }

  async updateClientDetails(userId, bio, address, city, state) {
    return await prisma.user_Detail.update({
      where: {
        userId: parseInt(userId),
        bio,
        address,
        city,
        state,
      },
    });
  }
}

module.exports = new clientDetails();
