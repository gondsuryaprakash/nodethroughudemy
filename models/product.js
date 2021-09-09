const fs =require('fs');
const path = require('path');
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
    constructor(title, price, description, imageurl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageurl = imageurl;
    }
    save() {
        getProductFromFile(product=>{
            product.push(this)
            fs.writeFile(p, JSON.stringify(product), (err)=> {
                console.log(err);
            })
        })
    }
    static fetchAll(callback) {
        getProductFromFile(callback)
     }


}

module.exports = Product;