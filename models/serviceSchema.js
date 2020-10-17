const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceTitle: String,
    serviceDescription: String,
    serviceImage: {
         data: Buffer, 
         contentType: String 
        }
})

module.exports = mongoose.model('Services',serviceSchema);