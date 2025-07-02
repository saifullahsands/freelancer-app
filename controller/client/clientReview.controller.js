const reviewService = require("../../services/reviewService");
const { BadRequestError, okResponse } = require("../../utils");

const addReview = async (req, res, next) => {
  try {
    const clientId = req.user.id;
    const { rating, orderId, comment } = req.body;
    const checkingOrder = await reviewService.checkOrder(orderId);
    if (!checkingOrder) {
      return BadRequestError(res, "order not found");
    }
    if (checkingOrder.clientId !== clientId) {
      return BadRequestError(res, "you can only review your own orders");
    }
    if (checkingOrder.status !== "COMPLETED") {
      return BadRequestError(res, "You can only review completed orders");
    }
    const existingOrder = await reviewService.checkingExistingReview(orderId);
    if (existingOrder) {
      return BadRequestError(
        res,
        "You have already submitted a review for this order"
      );
    }
    const newReview = await reviewService.createReview(
      checkingOrder.id,
      rating,
      comment,
      clientId,
      checkingOrder.freelancerId
    );

    okResponse(res, 200, " review created successfully !!", newReview);
  } catch (error) {
    console.log(`error in add Review  :; ${error.message}`);
    next(error);
  }
};

module.exports = {
  addReview,
};
