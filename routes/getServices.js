const serviceSchema = require('../models/serviceSchema');

const router = require('express').Router();


router.get('/getServices', async (req, res) => {
    try {
        const services = await serviceSchema.find({});
        res.json(services);
    } catch (err) {
        res.send(err)
    }
    
})



module.exports = router;