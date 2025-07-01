const clientOrderService = require("../../services/clients/clientOrderService");
const { okResponse, pagination } = require("../../utils");

const clientPlaceOrder = async (req, res, next) => {
  try {
    const clientId = req.user.id;
    const { freelancerId, gigId } = req.body;
    const order = await clientOrderService.placeOrder(
      clientId,
      freelancerId,
      gigId
    );
    okResponse(res, 200, "created Order successfully ", order);
  } catch (error) {
    console.log(`error in client place order :: ${error.message}`);
    next(error);
  }
};

const totalOrders = async (req, res, next) => {
  try {
    const clientId = req.user.id;
    const { skip, perPageRecord, page } = await pagination(req);
    const { orders, totalCount } = await clientOrderService.getAllOrders(
      clientId,
      skip,
      perPageRecord
    );
    const totalPage = Math.ceil(totalCount / perPageRecord);

    okResponse(res, 200, " ", {
      orders: orders,
      pages: {
        totalPages: totalPage,
        page: page,
        isNextPage: page < totalPage,
      },
    });
  } catch (error) {
    console.log(`error in total Orders :: ${error.message}`);
    next(error);
  }
};
module.exports = {
  clientPlaceOrder,
  totalOrders,
};
