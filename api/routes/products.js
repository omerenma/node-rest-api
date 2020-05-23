const express = require('express');
const router = express.Router();


//GET rout
router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"Handling GET request"
    })
})


// POST route
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        quantity:req.body.quantity
    }
    res.status(200).json({
        message:"Handling POST request",
        newProduct:product
    })
})


// GET by id route
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    console.log('Product id is :', id)
     res.status(200).json({message:`The product id is : ${id}`})
    
})

// EDIT by id route
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    console.log('Product id is :', id)
     res.status(200).json({message:`Update successful`})
    
})

// GET by id route
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    console.log('Product id is :', id)
     res.status(200).json({message:`Delete success!`})
    
})

module.exports = router;