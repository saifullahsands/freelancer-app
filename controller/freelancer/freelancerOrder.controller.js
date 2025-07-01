const freelancerOrderServices = require("../../services/freelancer/freelancerOrderService");
const { okResponse } = require("../../utils");
const freelancerUpdateOrder = async (req, res, next) => {
  try {
    const freelancerId = req.user.id;
    const { orderId, orderStatus } = req.body;
    const updateOrderStatus = await freelancerOrderServices.updateOrdersStatus(
      freelancerId,
      orderId,
      orderStatus
    );
    okResponse(res, 200, "freelancer updated order status ", updateOrderStatus);
  } catch (error) {
    console.log(`error in freelancer updated Order :: ${error.message}`);
    next(error);
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const freelancerId = req.user.id;
    const allOrders = await freelancerOrderServices.getAllOrdersStatus(
      freelancerId
    );
    okResponse(res, 200, " ", allOrders);
  } catch (error) {
    console.log(`error in get all Orders :: ${error.message}`);
    next(error);
  }
};

module.exports = {
  freelancerUpdateOrder,
  getAllOrder,
};
