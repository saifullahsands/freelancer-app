const { addReview } = require("../../controller/client/clientReview.controller")

const clientReviewRouter=require("express").Router()



clientReviewRouter.post("/",addReview)


module.exports=clientReviewRouter