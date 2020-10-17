const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    service: String,
    projectDetails: String,
    price: Number,
    status: String
})

module.exports = mongoose.model('Orders',orderSchema);