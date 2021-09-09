const Product = require('../models/product')


const getProducts = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/product-list', { product, pageTitle: 'Shop' })
    });
}

const getIndex = (req, res) => {
    Product.fetchAll((product) => {
        res.render('shop/index', {product, pageTitle: 'Index'})
    })
}

const getCart = (req,res,next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    })
}

const getCheckout = (req, res, next)=> {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'})
}

const getOrder = (req, res, next) => {
    res.render('shop/order', {path: 'order', pageTitle: 'Order'})
}
module.exports = { getProducts, getIndex, getCart, getCheckout, getOrder}

