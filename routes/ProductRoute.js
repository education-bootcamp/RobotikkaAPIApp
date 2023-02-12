const express = require('express');
const ProductController = require('../controller/ProductController');

const router = express.Router();
router.post('/create', ProductController.createProduct);
module.exports = router;