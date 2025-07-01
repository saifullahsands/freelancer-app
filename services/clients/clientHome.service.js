const prisma = require("../../prismaClient");

class clientHomeService {
  async clientHomeScreen(skip, perPageRecord) {
    const [freelancer, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: {
          role: "FREELANCER",
          isProfileCompleted: true,
        },
        skip,
        take: perPageRecord,
        select: {
          id: true,
          username: true,
          profileImage: true,
          userGig: {
            select: {
              id: true,
              title: true,
              price: true,
            },
          },
        },
      }),
      prisma.user.count({
        where: {
          role: "FREELANCER",
          isProfileCompleted: true,
        },
      }),
    ]);

    return { freelancer, totalCount };
  }

  async searchFreelancerwithGig(searchBy, skip, perPageRecord) {
    let searchQuery = searchBy?.toLowerCase() || "";

    console.log(`search Query  :: ${searchQuery}`);
    let where = {
      role: "FREELANCER",
      isProfileCompleted: true,
      userGig: {
        OR: [
          {
            title: {
              contains: searchQuery,
            },
          },
          {
            description: {
              contains: searchQuery,
            },
          },
        ],
      },
    };

    const [searchFreelancer, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: perPageRecord,
        select: {
          profileImage: true,
          userGig: {
            select: {
              title: true,
              description: true,
              price: true,
            },
          },
        },
      }),
      await prisma.user.count({
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
