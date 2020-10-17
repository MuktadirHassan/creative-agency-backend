const reviewSchema = require('../models/reviewSchema');

const router = require('express').Router();


router.get('/getReviews', async (req, res) => {
    try {
        const reviews = await reviewSchema.find({});
        res.json(reviews);
    } catch (err) {
        res.send(err)
    }
    
})



module.exports = router;