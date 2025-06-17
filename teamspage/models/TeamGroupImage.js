// teamspage/models/TeamGroupImage.js
const mongoose = require('mongoose');

const TeamGroupImageSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('TeamGroupImage', TeamGroupImageSchema);
