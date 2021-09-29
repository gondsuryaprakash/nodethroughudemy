const express = require('express');

const shopController = require('../controllers/shop');

const { getProducts , getIndex, getCart, getCheckout, getOrder, getProductFromId, postCart, postDeleteCart  } = shopController;
const router = express.Router();   

router.get('/', getIndex)
router.get('/products', getProducts);
router.get('/product/:productId',getProductFromId)
router.get('/cart',getCart);
router.post('/add-cart',postCart)
router.get('/checkout', getCheckout);
router.get('/order',getOrder);
router.post('/delete-cart', postDeleteCart)

module.exports = router;