const admin = require('firebase-admin');
const router = require('express').Router();
const orderSchema = require('../models/orderSchema');


router.get('/', async (req, res) => {
    try {
        const authToken = req.header('authToken');
        
        if(!authToken){
            return res.redirect('/login').send({
                status:false,
                message:'Access Denied',
                code:403
            })
            
        } else {
            admin.auth().verifyIdToken(authToken)
            .then( async token => {
                try {
                    const email = token.email;
                    const orders = await orderSchema.find({email:email});
                    res.send(orders);

                } catch (err) {
                    res.send({
                        status: true,
                        message: 'Nothing Found'
                    })
                }
            })
            .catch(err => res.send({err,
            message: 'Token expired or bad token'}))
        }

    } catch (err) {
        res.send(err);
    }
});

module.exports = router;