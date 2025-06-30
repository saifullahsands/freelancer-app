const prisma = require("../../prismaClient");

class clientOrderService {
  async placeOrder(clientId, freelancerId) {
    return await prisma.order.create({
      data: {
        clientId: parseInt(clientId),
        freelancerId: parseInt(freelancerId),
      },
    });
  }
}

module.exports=new clientOrderService();
