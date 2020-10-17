const orderSchema = require("../models/orderSchema");
const admin = require('firebase-admin');
const router = require('express').Router();

router.patch('/updateStatus', async (req, res) => {
    try {
        
        const authToken = req.header('authToken');
        
        if(!authToken){
            return res.redirect('/').send({
                status:false,
                message:'Access Denied',
                code:403
            })
            
        } else {
            admin.auth().verifyIdToken(authToken)
            .then( async token => {
                try {
                    
                    const updateStatus = await orderSchema.updateOne({_id:req.body._id},{$set:
                    {
                        status: req.body.status
                    }});
                    res.send({message:'updated successfully'}).status(200)

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