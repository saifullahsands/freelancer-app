const { pagination, okResponse } = require("../../utils");
const clientHomeService = require("../../services/clients/clientHome.service");
const clientHomeScreen = async (req, res, next) => {
  try {
    const { skip, perPageRecord, page } = await pagination(req);
    const { freelancer, totalCount } = await clientHomeService.clientHomeScreen(
      skip,
      perPageRecord
    );
    const totalPage = Math.ceil(totalCount / perPageRecord);

    okResponse(res, 200, "home Screen ", {
      freelancer: freelancer,
      Pages: {
        page: page,
        totalPage: totalPage,
        isNextPage: page < totalPage,
      },
    });
  } catch (error) {
    console.log(`error in client Home screen ${error.message} `);
    next(error);
  }
};

module.exports = {
  clientHomeScreen,
};
