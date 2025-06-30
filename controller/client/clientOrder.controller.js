const clientOrderService = require("../../services/clients/clientOrderService");
const { okResponse } = require("../../utils");

const clientPlaceOrder = async (req, res, next) => {
  try {
    const clientId = req.user.id;
    const { freelancerId } = req.body;
    const order = await clientOrderService.placeOrder(clientId, freelancerId);
    okResponse(res, 200, "created Order successfully ", order);
  } catch (error) {
    console.log(`error in client place order :: ${error.message}`);
    next(error);
  }
};

module.exports = {
  clientPlaceOrder,
};
