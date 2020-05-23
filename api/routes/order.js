const express = require('express');
const router = express.Router();


// GET order
router.get('/', (req, res, next) => {
res.status(200).json({message:'Suucess!'})
})

// POST order
router.post('/', (req, res, next) => {
    res.status(200).json({message:'Suucess!'})

})

// GET order by id
router.get('/:id', (req, res, next) => {
    const orderId = req.params.id
    res.status(200).json({message:'Success!', orderId})
    })


// Update order by id
router.patch('/:id', (req, res, next) => {
    const orderId = req.params.id
    res.status(200).json({message:'Updated!', orderId})
    })

    // DLETE order by id
router.delete('/:id', (req, res, next) => {
    const orderId = req.params.id
    res.status(200).json({message:'Deleted!', orderId})
    })
module.exports = router;