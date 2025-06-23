const mongoose = require('mongoose');

const SocialIconSchema = new mongoose.Schema({
    src: String,
    alt: String,
    url: String,
});

const AboutUsSchema = new mongoose.Schema({
    heading: String,
    description: String,
    smallImage: String,
    bigImage: String,
    socialIcons: [SocialIconSchema],
});

module.exports = mongoose.model('AboutUs', AboutUsSchema);
