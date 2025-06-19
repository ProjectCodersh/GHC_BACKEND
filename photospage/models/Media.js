
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    title: String,
    filename: String,
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Media', mediaSchema);

