const express = require('express');
const OrderController = require('../controller/OrderController');

const router = express.Router();
router.post('/make', OrderController.createOrder);
module.exports = router;