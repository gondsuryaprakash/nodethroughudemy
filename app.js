const express = require('express');
const bodyParser = require('body-parser') 
const path = require('path')
const erroController = require('./controllers/error')

const { errorController } = erroController;

const adminRouter= require('./routes/admin')
const shopAdmin = require('./routes/shop')

const app = express();

app.set('view engine', 'ejs');
const PORT = 3030;
const dir_Name = require('./utills/path')

app.use(bodyParser.urlencoded({ extended:false
 }))

app.use(express.static(path.join(dir_Name,'public')))

app.use(shopAdmin);
app.use('/admin',adminRouter);

app.use(errorController)


app.listen(PORT, ()=>{
    console.log("Listen on ", 'http://localhost:3030/');
});

