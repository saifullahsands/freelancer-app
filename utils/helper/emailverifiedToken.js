
const { v4:uuidv4 } =require('uuid');

const createEmailVerifiedToken=async()=>{
    const token=uuidv4();
    return token
}

module.exports={
    createEmailVerifiedToken
}