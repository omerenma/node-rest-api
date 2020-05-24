const express = require('express');
const router = express.Router();
const productSchema = require('../schema/productsSchema')


//GET rout
router.get('/', (req, res, next) => {
    productSchema.find()
    .then(data => res.json(data))
    .catch(err => res.json({message:err.status}))
    
})


// POST route
router.post('/', (req, res, next) => {
   const product = new productSchema({
       name: req.body.name,
       price:req.body.price,
       quantity:req.body.quantity
   })
   product.save()
   .then(result => {
       console.log(result)
   })
   .catch(err => {
       console.log(err)
   })
    res.status(200).json({
        message:"Handling POST request",
        newProduct:product
    })
})


// GET by id route
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
   productSchema.findById(id, (err, data) => {
       err ? res.status(404).json({message:'Could not fetch'}) : res.json({data})
       
   })
})

// EDIT by id route
router.patch('/:productId', (req, res, next) => {
   
    
})

// DELETE by id route
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    productSchema.remove({_id:id}, (err, data) =>{
        err ? res.status(500).json({message:err.status}) : res.json({data})
    })
    
    
     
})

module.exports = router;