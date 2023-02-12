const OrderSchema = require('../model/Order');
const jwt = require('jsonwebtoken');
const createOrder = (req, resp) => {
    const order = new OrderSchema({
        cost: req.body.cost,
        date: req.body.date,
        customer: req.body.customer,
        products: req.body.products
    });

    let token = req.header('authorization');
    if (token.toString().startsWith('Bearer ')) {
        token = token.toString().replace('Bearer ', '');
// async await
        jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
            if (err) {
                resp.status(503).json({'message': 'Wrong token'});
                return;
            }
            order.save().then(result => {
                resp.status(201).json(result);
            }).catch(error => {
                resp.status(500).json(error);
            })
        });

    } else {
        resp.status(401).json({'message': 'Wrong token'});
    }
}
module.exports = {
    createOrder
}