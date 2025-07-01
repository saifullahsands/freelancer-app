const prisma=require("../../prismaClient")

class freelancerGigServices{
      async createFreelancerGig(
    userId,
    title,
    description,
    price,
    cvImageOrPdf,
    category,
    deliveryTime
  ) {
    const title1 = title.toLowerCase();
    const parsedPrice = parseFloat(price);
    if (!price || isNaN(parsedPrice)) {
      throw new Error("Price must be a valid number.");
    }
    return await prisma.gig.create({
      data: {
        userId: parseInt(userId),
        title: title1,
        description,
        price: parsedPrice,
        CVImageOrPdf: cvImageOrPdf,
        category,
        deliveryTime,
      },
    });
  }
  async deleteGig(userId,gigId){
    return await prisma.gig.delete({
        where:{
            userId:parseInt(userId),
            id:parseInt(gigId)
        }
    })
  }
  async updateGig(userId,gigId, title,description,deliveryTime,category,CVImageOrPdf){
    return await prisma.gig.create({
        where:{
            userId:parseInt(userId),
            id:parseInt(gigId)
        },
        data:{
            title,
            description,
            deliveryTime,
            category,
            CVImageOrPdf
        }
    })
  }
}

module.exports=new freelancerGigServices();