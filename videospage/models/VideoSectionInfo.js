const mongoose = require('mongoose');

const videoSectionInfoSchema = new mongoose.Schema({
    heading: String,
    description: String,
    videoUrl: String
});

module.exports = mongoose.model('VideoSectionInfo', videoSectionInfoSchema);