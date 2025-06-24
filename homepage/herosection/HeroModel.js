const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    heading: String,
    description: String,
    backgroundImage: String, // path like 'uploads/hero-bg.webp'
    buttons: [
        {
            text: String,
            variant: String, // e.g. 'green' or 'outline-green'
            action: String,  // URL or tel: link
        }
    ],
    images: [
        {
            src: String,        // path like 'uploads/hero-img1.webp'
            alt: String,
            position: String,   // e.g. 'top', 'bottom'
        }
    ]
});

module.exports = mongoose.model('Hero', HeroSchema);
