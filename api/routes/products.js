const express = require('express');
const router = express.Router();
const ProductSchema = require('../schema/productsSchema')


//GET rout
router.get('/', (req, res, next) => {
    ProductSchema.find()
    // Specify the fields to fetch using .select
    .select('name price _id')
    .then(data => {
        const response = {
            count:data.length,
            products:data
        };
        res.json({response})

    })
    .catch(err => res.json({message:err.status}))
})

// POST route
router.post('/', (req, res, next) => {
   const Product = new ProductSchema({
       name: req.body.name,
       price:req.body.price,
       quantity:req.body.quantity
   })
   Product.save()
   .then(result => {
       console.log(result)
   })
   .catch(err => {
       console.log(err)
   })
    res.status(200).json({
        message:"Handling POST request",
        newProduct:Product
    })
})

// GET by id route
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
   ProductSchema.findById(id, (err, data) => {
       err ? res.status(404).json({message:'Could not fetch'}) : res.json({data})
       
   })
})

// EDIT by id route
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    ProductSchema.update({_id:id}, {$set:{name:req.body.name, price:req.body.price, quantity:req.body.quantity}})
        .then(result => res.json({result}))
        .catch(err => {
            res.status(500).json({message:err.status})
        })
})

// DELETE by id route
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    ProductSchema.remove({_id:id}, (err, data) =>{
        err ? res.status(500).json({message:err.status}) : res.json({data})
    })    
})

module.exports = router;