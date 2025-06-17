const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Video', videoSchema);
