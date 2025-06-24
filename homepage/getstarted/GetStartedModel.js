const mongoose = require('mongoose');

const GetStartedSchema = new mongoose.Schema({
    heading1: String,
    heading2: String,
    quoteButton: {
        text: String,
        link: String,
    },
    callButton: {
        text: String,
        link: String,
    },
    backgroundImage: String,
    sideImages: [
        {
            src: String,
            alt: String,
            className: String,
        }
    ]
});

module.exports = mongoose.model('GetStarted', GetStartedSchema);
