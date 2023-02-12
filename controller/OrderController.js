const OrderSchema = require('../model/Order');
const createOrder =(req,resp)=>{
    const order = new OrderSchema({
        cost:req.body.cost,
        date:req.body.date,
        customer:req.body.customer,
        products:req.body.products
    });
    order.save().then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    })
}
module.exports={
    createOrder
}