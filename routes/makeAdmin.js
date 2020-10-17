const router = require('express').Router();
const admin = require('firebase-admin');
const adminSchema = require('../models/adminSchema');

router.post('/makeAdmin', async (req, res) => {
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
                    const newAdmin = new adminSchema({
                        email : req.body.email
                    });
                    const addAdmin = await newAdmin.save();
                    res.send(addAdmin)

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