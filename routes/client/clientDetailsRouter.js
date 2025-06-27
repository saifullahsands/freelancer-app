const clientDetailsRouter=require("express").Router();
const { authenticated,verifyRole}=require("../../middleware/auth.middleware");
const { createclientDetails,updatedClientDetails } = require("../../controller/client/clientDetails.controller");



clientDetailsRouter.post("/details",authenticated,verifyRole("CLIENT"),createclientDetails);
clientDetailsRouter.patch("/details",authenticated,verifyRole("CLIENT"),updatedClientDetails)


module.exports=clientDetailsRouter