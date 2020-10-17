const router = require('express').Router();
const admin = require('firebase-admin');
const orderSchema = require('../models/orderSchema');

router.get('/allOrders', async (req, res) => {
    try {
        const authToken = req.header('authToken');
        
        if(!authToken){
            res.redirect('/login').send({
                status:false,
                message:'Access Denied',
                code:403
            })
            
        } else {
            admin.auth().verifyIdToken(authToken)
            .then( async token => {
                try {
                    const orders = await orderSchema.find({});
                    res.json(orders);
                } catch (err) {
                    res.send(err)
                }
            })
            .catch(err => res.send({err,
            message: 'Token expired or bad token'}))
        }

    } catch (err) {
        res.send(err);
    }
})

module.exports = router;