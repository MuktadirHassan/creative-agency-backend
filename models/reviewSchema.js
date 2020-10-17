const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: String,
    designation: String,
    review: String,
    photoURL: String
})

module.exports = mongoose.model('Reviews',reviewSchema);