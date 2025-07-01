const prisma = require("../../prismaClient");

class Freelancer_Details {
  async createFreelancerDetail(userId, address, city, state, bio, gender) {
    return await prisma.user_Detail.create({
      data: {
        userId: parseInt(userId),
        address,
        city,
        state,
        bio,
        gender,
      },
    });
  }
  async createFreelanceGig(
    userId,
    title,
    description,
    price,
    cvImageOrPdf,
    category,
    deliveryTime
  ) {
    const title1 = title.toLowerCase();
    const parsedPrice = parseFloat(price);
    if (!price || isNaN(parsedPrice)) {
      throw new Error("Price must be a valid number.");
    }
    return await prisma.gig.create({
      data: {
        userId: parseInt(userId),
        title: title1,
        description,
        price: parsedPrice,
        CVImageOrPdf: cvImageOrPdf,
        category,
        deliveryTime,
      },
    });
  }
  async updateFrrelancerDetail(userId, address, city, state, bio) {
    return prisma.user_Detail.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        address,
        city,
        state,
        bio,
      },
    });
  }


}

module.exports = new Freelancer_Details();
