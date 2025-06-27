const prisma = require("../../prismaClient");
const { pagination } = require("../../utils");

class clientHomeService {
  async clientHomeScreen(skip, perPageRecord) {
    const [freelancer, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: {
          role: "FREELANCER",
        },
        skip,
        take: perPageRecord,
        select: {
          username: true,
          profileImage,
          userGig: {
            select: {
              title,
              price,
            },
          },
        },
      }),
      prisma.user.count({
        where: {
          role: "FREELANCER",
        },
      }),
    ]);

      return {freelancer,totalCount}
  }


}

module.exports = new clientHomeService();
