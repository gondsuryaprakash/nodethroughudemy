const express = require('express');
const path = require('path');

const dir_name = require('../utills/path')
const shopController = require('../controllers/shop');
const { get } = require('http');
const { getProducts , getIndex, getCart, getCheckout, getOrder  } = shopController;
const router = express.Router();   

router.get('/', getIndex)
router.get('/products', getProducts);
router.get('/cart',getCart);
router.get('/checkout', getCheckout);
router.get('/order',getOrder);

module.exports = router;