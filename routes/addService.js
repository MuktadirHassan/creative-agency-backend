const router = require('express').Router();

const multer = require('multer');
const upload = multer({ dest:'uploads/'});



const fs = require('fs');
const path = require('path');

const serviceSchema = require('../models/serviceSchema');




router.post('/addService', upload.single('image') ,async (req, res) => {
    try{
        
        if(!req.file){
            res.send({
                status: false,
                message: 'No files'
            })
        }else{
            
            const newService = new serviceSchema({
                serviceTitle: req.body.serviceTitle,
                serviceDescription: req.body.serviceDescription,
                serviceImage: {
                    data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
                    contentType: req.file.mimetype
                }
            });
            const addedService = await newService.save();
            res.send({
                status:true,
                message:'Service added successfully'
            })
            
        }


    }catch(err){
        res.send(err).status(500);
    }

})

module.exports = router;
