const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Routes paths
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

//Login morgan
app.use(morgan('dev'))

//Extracting our request body using body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Mongoose connection to mongodb 
const url = 'mongodb://products:kingsly7@ds061248.mlab.com:61248/node-rest-api';
const db = mongoose.connect(url)

// CORS Errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    //Check if browsers sends OOPTION request
    if(req.method === 'OPTIONS' ){
        res.header('Access-Control-Allow-Methoss', 'POST, PUT, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
  
    next();

})

// Router middleware
app.use('/products', productRoutes);
app.use('/order', orderRoutes);

// handling errors that don't pass our routes
app.use((req, res, next) => {
    // Create a new error object
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

// handling all kinds of errors 
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})


 module.exports = app;