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
  async createFreelanceGig(userId, title, description, price, cvImageOrPdf) {
    const title1 = title.toLowerCase();
     const parsedPrice = parseFloat(price);
  if (!price || isNaN(parsedPrice)) {
  throw new Error( "Price must be a valid number.");
}
    return await prisma.gig.create({
      data: {
        userId: parseInt(userId),
        title: title1,
        description,
        price: parsedPrice,
        CVImageOrPdf: cvImageOrPdf,
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

  async updateFreelancerGig(userId, title, description, price) {
    return await prisma.gig.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        title,
        description,
        price: parseFloat(price).toFixed(2),
      },
    });
  }

  async updateCvImageOrPdf(userId, cvImageOrPdf) {
    return await prisma.gig.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        CVImageOrPdf: cvImageOrPdf,
      },
    });
  }
}

module.exports = new Freelancer_Details();
