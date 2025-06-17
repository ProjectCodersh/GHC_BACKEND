
const mongoose = require('mongoose');

const reviewCardsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    imagePath: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('ReviewCards', reviewCardsSchema);


