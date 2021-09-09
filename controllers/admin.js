const Product = require('../models/product')
const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { pageTitle: 'Add Product' })
}

const postAddProduct = (req, res, next) =>  {
    const { title, price, description, imageurl } = req.body
    const product = new Product(title, price, description, imageurl);
    product.save();
    console.log('/');
    res.redirect('/');
}

const getProducts = (req, res, next) =>{
    Product.fetchAll((product)=> {
        res.render('admin/products', {
            pageTitle: 'Admin Product',
            product
        })
    })
}

module.exports = { getAddProduct, postAddProduct, getProducts }