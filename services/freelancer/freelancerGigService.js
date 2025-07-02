const prisma=require("../../prismaClient")

class freelancerGigServices{
 
  async findGig(userId,gigId){
    return await prisma.gig.findFirst({
        where:{
            userId:parseInt(userId),
            id:parseInt(gigId)
        }
    })
  }
  async deleteGig(gigId){
    return await prisma.gig.delete({
      where:{
        id:parseInt(gigId)
      }
    })
  }

  async addingGigs(userId,title,description,price,category,deliveryTime,CVImageOrPdf){
    const price1=parseFloat(price)
    return await prisma.gig.create({
      data:{
        userId:parseInt(userId),
        title,
        description,
        price:price1,
        category,
        deliveryTime,
        CVImageOrPdf
      }
    })
  }
  async updateGig(userId,gigId, title,description,deliveryTime,category,CVImageOrPdf){
    return await prisma.gig.update({
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