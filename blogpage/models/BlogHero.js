const mongoose = require('mongoose');

const blogHeroSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('BlogHero', blogHeroSchema);
