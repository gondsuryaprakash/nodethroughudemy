const express = require('express');
const path = require('path')
const root_dir = require('../utills/path')
const productController = require('../controllers/admin')
const router = express.Router();



const { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, postProductDelete} = productController


router.get('/add-product', getAddProduct)
router.get('/products',getProducts);
router.post('/add-product',postAddProduct)
router.get('/edit-product/:prdoId',getEditProduct)
router.post('/edit-product',postEditProduct)
router.post('/delete/:prodId', postProductDelete)

module.exports= router
