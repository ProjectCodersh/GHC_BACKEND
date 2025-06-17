const mongoose = require('mongoose');

const reviewHeroSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    description: { type: String, required: true },
    buttontext: { type: String, required: true },
});

module.exports = mongoose.model('ReviewHero', reviewHeroSchema);
