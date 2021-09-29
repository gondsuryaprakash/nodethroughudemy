const Product = require('../models/product')
const Cart = require('../models/cart')

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
    Product.fetchAll(product=> {
        Cart.getCart(cart=>{
            const cartItemProduct = []
            if(cart) {
                cart.product.map(item=> {
                  const cartItem =  product.find(prod=> item.id===prod.id)
                  cartItemProduct.push({productInCart: cartItem, qty: item.qty})

                })
            }
            console.log('cartItemProduct',cartItemProduct);
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                cartItem: cartItemProduct
            })
        })
    })
}

const postCart = (req,res,next) => { 
    const productId = req.body.productId;
    Product.findById(productId, (product)=> {
        const { id , price} = product; 
        Cart.addToCart(id, price)
    })
    res.redirect('/cart')
}

const getCheckout = (req, res, next)=> {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'})
}

const getProductFromId = (req,res,next) => { 
    const productId = req.params.productId;
    Product.findById(productId, product=> {
        console.log(product);
       
        res.render('shop/product-details', {pageTitle: product.title, product})
    } )

}

const getOrder = (req, res, next) => {
    res.render('shop/order', {path: 'order', pageTitle: 'Order'})
}

const postDeleteCart =(req, res, next)=> {
    const {id, productprice} = req.body
    Cart.deleteCart(id, productprice)
    res.redirect('/cart')
}

module.exports = { getProducts, getIndex, getCart,postCart, getCheckout, getOrder, getProductFromId, postDeleteCart}

