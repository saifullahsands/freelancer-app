const prisma = require("../../prismaClient");

class clientHomeService {
  async clientHomeScreen(skip, perPageRecord) {
    const [gigs, totalCount] = await Promise.all([
      prisma.gig.findMany({
        skip,
        take: perPageRecord,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      prisma.gig.count({}),
    ]);

    const enhancedGig = await Promise.all(
      gigs.map(async (gig) => {
        const [totalOrders, avgRatingResult] = await Promise.all([
          prisma.order.count({
            where: {
              gigId: parseInt(gig.id),
            },
          }),
          prisma.review.aggregate({
            _avg: {
              rating: true,
            },
            where: {
              order: {
                gigId: parseInt(gig.id),
              },
            },
          }),
        ]);
        return {
          ...gig,
          totalOrders: totalOrders,
          averageRating: avgRatingResult._avg.rating || 0,
        };
      })
    );

    return { freelancer: enhancedGig, totalCount };
  }

  async searchFreelancerwithGig(searchBy, skip, perPageRecord) {
    let searchQuery = searchBy?.toLowerCase() || "";

    console.log(`search Query  :: ${searchQuery}`);
    let where = {
      title: {
        contains: searchBy,
      },
      description: {
        contains: searchBy,
      },
    };

    const [searchFreelancer, totalCount] = await Promise.all([
      prisma.gig.findMany({
        where,
        skip,
        take: perPageRecord,
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      await prisma.gig.count({
        where,
      }),
    ]);
    return { searchFreelancer, totalCount };
  }

  async gettingFreelancerGig(gigId) {
    return await prisma.gig.findFirst({
      where: {
        id: parseInt(gigId),
      },
      select: {
        title: true,
        category: true,
        price: true,
        user: {
          select: {
            username: true,
            profileImage: true,
          },
        },
      },
    });
  }
}

module.exports = new clientHomeService();
