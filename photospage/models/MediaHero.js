const mongoose = require('mongoose');

const mediaHeroSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('MediaHero', mediaHeroSchema);
