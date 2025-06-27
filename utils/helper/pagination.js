

function pagination(req){
    const page=parseInt(req.query.page) || 1;
    const perPageRecord=parseInt(req.query.perPageRecord) || 10;
    const skip=(page-1)*perPageRecord;
    return {page,skip,perPageRecord}
}

module.exports={
    pagination
}