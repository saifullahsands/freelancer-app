const prisma = require("../../prismaClient");

class clientOrderService {
  async placeOrder(clientId, freelancerId, gigId) {
    return await prisma.order.create({
      data: {
        clientId: parseInt(clientId),
        freelancerId: parseInt(freelancerId),
        gigId: parseInt(gigId),
      },
    });
  }

  async getAllOrders(clientId,skip,perPageRecord) {
    const [orders,totalCount]=await new Promise.all([ 
      await prisma.order.findMany({
      where: {
        clientId: parseInt(clientId),
      },
      skip,
      take:perPageRecord,
      select: {
        client: {
          select: {
            id: true,
            username: true,
            profileImage: true,
            userDetails: {
              select: {
                gender: true,
                city: true,
                state: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    await prisma.order.count({
      where: {
        clientId: parseInt(clientId),
      },})
    ])
    return { orders,totalCount}
  }
}

module.exports = new clientOrderService();
