const router = require('express').Router();
const admin = require('firebase-admin');
const reviewSchema = require('../models/reviewSchema');

router.post('/', async (req, res) => {
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
                    const newReview = new reviewSchema({
                        name: req.body.name,
                        designation: req.body.company,
                        review: req.body.review,
                        photoURL: req.body.photoURL
                    });
                    const addReview = await newReview.save();
                    res.send(addReview)

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