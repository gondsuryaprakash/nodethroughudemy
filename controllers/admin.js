const Product = require('../models/product')
const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { pageTitle: 'Add Product', editing: false })
}

const postAddProduct = (req, res, next) => {
    const {title, price, description, imageurl } = req.body
    const product = new Product(null, title, price, description, imageurl);
    product.save();
    console.log('/');
    res.redirect('/');
}

const getEditProduct = (req, res, next) => {
    const editMode = true
    console.log("req", req.query);
    const { prdoId: id } = req.params;
    console.log('id', id);
    if (!editMode) {
        return res.redirect('/')
    }

    Product.findById(id, (product) => {
        if(!product) {
            return res.redirect('/');
        }
        console.log(product);
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            product,
            editing : editMode

        })
    })


}

const getProducts = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('admin/products', {
            pageTitle: 'Admin Product',
            product
        })
    })
}

const postEditProduct =(req,res,next)=> {

    const {prodId, title, description, price, imageurl} = req.body
    const product = new Product(prodId, title, price, description, imageurl);
    product.save();
    console.log("Save Called");
    res.redirect('/admin/products')
}

const postProductDelete = (req, res, next)=> {
    const {prodId} = req.params;
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}

module.exports = { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, postProductDelete }