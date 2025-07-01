const prisma = require("../../prismaClient");

class freelancerOrderServices {
  async updateOrdersStatus(freelancerId, orderId, orderStatus) {
    return await prisma.order.update({
      where: {
        freelancerId: parseInt(freelancerId),
        id: parseInt(orderId),
      },
      data: {
        status: orderStatus,
      },
    });
  }

  async getAllOrdersStatus(freelancerId) {
    return await prisma.order.findMany({
      where: {
        freelancerId: parseInt(freelancerId),
      },
      select: {
        id: true,
        gig: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        client: {
          select: {
            username: true,
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
    });
  }
}

module.exports = new freelancerOrderServices();
