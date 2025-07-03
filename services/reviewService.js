const prisma = require("../prismaClient");
class reviewService {
  async checkOrder(orderId) {
    const orders= await prisma.order.findMany({
      where: {
        id: orderId,
      },
      select:{
        clientId:true,
        status: true,
      id: true,
      freelancerId: true,
      }
    });
    return orders[0]
  }

  async checkingExistingReview(orderId) {
    return await prisma.review.findUnique({
      where: {
        OrderId:orderId,
      },
    });
  }

  async createReview(orderId, rating, comment, clientId, freelancerId) {
    return await prisma.review.create({
      data: {
        freelancerId: parseInt(freelancerId),
        clientId: parseInt(clientId),
        OrderId: orderId,
        rating:parseInt(rating),
        comment,
      },
    });
  }

  async getAllClientOrders(clientId){
    return await prisma.order.findMany({
      where:{
        clientId:parseInt(clientId)
      },
      include:{
        freelancer:{
          select:{
          
            username:true,
            
          }
        }
      }
    })
  }
}

module.exports = new reviewService();
