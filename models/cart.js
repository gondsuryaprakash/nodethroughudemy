const { error } = require('console');
const fs = require('fs');
const path = require('path')
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)


class Cart {
    static addToCart(id, productPrice) {

        fs.readFile(p, (err, fileContent) => {
            let cart = { product: [], totalprice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.product.findIndex(prod => prod.id === id);
            console.log(existingProductIndex);

            const existingProduct = cart.product[existingProductIndex]
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = parseInt(existingProduct.qty) + 1;
                cart.product = [...cart.product ]
                cart.product[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 }

                cart.product = [...cart.product, updatedProduct];
                console.log(cart.product);
            }
            cart.totalprice = cart.totalprice + parseInt(productPrice)

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })

        }

        )


    }

    //{"product":[{"id":"0.27044493636038625","qty":3}],"totalprice":3}
    static deleteCart(id, productPrice) {
        fs.readFile(p, (err, fileContent)=> {
            let cart = {}
            if(!err) {
                 cart = JSON.parse(fileContent); 
                 const index = cart.product.findIndex(prod=> prod.id === id);
                 cart.product[index].qty = cart.product[index]?.qty -1;

                 if(cart.product[index].qty===0) {
                     this.deleteTotalProductFromCart(id, productPrice);
                     return;
                 }
                 cart.totalprice = cart.totalprice - productPrice;
                 fs.writeFile(p, JSON.stringify(cart), (err)=> {
                     if(err) {
                         console.log(err);
                     }
                 })
            }
        }
            )
    }
      //{"product":[{"id":"0.27044493636038625","qty":3}],"totalprice":3}
    static deleteTotalProductFromCart(id, productPrice) {
        fs.readFile(p, (err,fileContent)=> {
            if(!err) {
                const cart = JSON.parse(fileContent);
                const existenceProductID = cart.product.findIndex(prod=> prod.id===id); 
                const quantity = cart.product[existenceProductID].qty;
                const updatedProduct = cart.product.filter(el=> el.id !== id)
                cart.product = [...cart.product];
                cart.product = updatedProduct;
                cart.totalprice = cart.totalprice- quantity*productPrice;

                fs.writeFile(p, JSON.stringify(cart), (err)=> {
                    if(err) {
                        console.log(err);
                    }
                })
            }
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent)=> {
            if(!err) {
                cb(JSON.parse(fileContent))
            }
            else {
                cb(null)
            }
        })
    }
}

module.exports = Cart;