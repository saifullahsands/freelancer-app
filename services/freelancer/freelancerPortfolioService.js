const prisma = require("../../prismaClient");

class freelancerPortfolioService {
  async creatPortfolio(freelancerId, title, descriptions, filesUrl) {
    return await prisma.portfolio.create({
      data: {
        freelancerId: parseInt(freelancerId),
        title,
        descriptions,
        fileUrls: filesUrl,
      },
    });
  }

  async findPortfolio(portfolioId,freelancerId) {
    return await prisma.portfolio.delete({
      where: {
        id: parseInt(portfolioId),
        freelancerId:parseInt(freelancerId)
      },
    });
  }

  async deletePortfolio(portfolioId){
    return await prisma.portfolio.delete({
      where:{
        id:parseInt(portfolioId)
      }
    })
  }
  async getAllPortfolio(freelancerId) {
    return await prisma.portfolio.findMany({
      where: { freelancerId: parseInt(freelancerId) },
      select: {
        id: true,
        title: true,
        descriptions: true,
        fileUrls: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

module.exports = new freelancerPortfolioService();
