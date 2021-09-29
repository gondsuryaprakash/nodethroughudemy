const fs =require('fs');
const path = require('path');
const Cart = require('./cart');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data', 
    'products.json'
    )

const getProductFromFile =callback=> {

    fs.readFile(p, (err, fileContent)=>{
        if(err) {
            callback([])
        }
        else {
            callback(JSON.parse(fileContent))
        }
        
    })
}

class Product {
    constructor(id,title, price, description, imageurl) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageurl = imageurl;
    }
    save() { 
        getProductFromFile(product=>{
            if(this.id !=null) {
                const existedProductIndex = product.findIndex((prod)=> prod.id ===this.id)
                console.log("existedProductIndex",existedProductIndex, );
                const upatedProduct = [...product]
                upatedProduct[existedProductIndex] = this;
                fs.writeFile(p, JSON.stringify(upatedProduct), (err)=> {
                    console.log(err);
                })
            }
            else {
                this.id = Math.random().toString();
                console.log("This one is called");
                product.push(this)
                fs.writeFile(p, JSON.stringify(product), (err)=> {
                    console.log(err);
                })
            }
        })
    }

    static deleteById(id) {
        getProductFromFile(product=> { 
            const productPrice = product.find(el=> el.id ===id).price; 
            const updatedProduct = product.filter(prod=> prod.id !== id)

            Cart.deleteTotalProductFromCart(id, productPrice)
            fs.writeFile(p, JSON.stringify(updatedProduct), (err)=> {
                console.log(err);
            } )
        })
    }

    static fetchAll(callback) {
        getProductFromFile(callback)
     }
    static findById(id, callback) {
        getProductFromFile(products=>{
            const product = products.find(p=> p.id===id)
            callback(product)
        })

    }


}

module.exports = Product;