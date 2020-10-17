const orderSchema = require('../models/orderSchema');

const router = require('express').Router();

router.post('/order', async (req, res) => {
    
    try {
        const orderSummery = new orderSchema({
            name: req.body.name,
            email: req.body.email,
            service: req.body.service,
            projectDetails: req.body.projectDetails,
            price: req.body.price,
            status: 'Pending'
        });
        const newOrder = await orderSummery.save();
        res.staus(200).send({status: true,message:'Order placed'});
    }
    catch (err) {
        res.send(err);
    }
})

module.exports = router;