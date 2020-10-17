const adminSchema = require('../models/adminSchema');

const router = require('express').Router();


router.get('/getAdmin', async (req, res) => {
    try {
        const admins = await adminSchema.find({});
        res.json(admins);
    } catch (err) {
        res.send(err)
    }
    
})



module.exports = router;