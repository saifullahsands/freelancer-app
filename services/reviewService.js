const prisma = require("../prismaClient");
class reviewService {
  async checkOrder(orderId) {
    return await prisma.order.findMany({
      where: {
        id: orderId,
      },
      include: {
        client: true,
        freelancer: true,
        review: true,
      },
    });
  }

  async checkingExistingReview(orderId) {
    return await prisma.review.findUnique({
      where: {
        id: orderId,
      },
    });
  }

  async createReview(orderId, rating, comment, clientId, freelancerId) {
    return await prisma.review.create({
      data: {
        freelancerId: parseInt(freelancerId),
        clientId: parseInt(clientId),
        OrderId: orderId,
        rating,
        comment,
      },
    });
  }
}

module.exports = new reviewService();
