const ProductSchema = require('../model/Product');
const createProduct =(req,resp)=>{
    const product = new ProductSchema({
        description:req.body.description,
        unitPrice:req.body.unitPrice,
        qtyOnHand:req.body.qtyOnHand
    });
    product.save().then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    })
}
module.exports={
    createProduct
}