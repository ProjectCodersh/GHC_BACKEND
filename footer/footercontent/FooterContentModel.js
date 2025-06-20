const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
    text: String,
    type: { type: String, enum: ['green', 'white'], default: 'green' },
    link: String,
});

const footerContentSchema = new mongoose.Schema({
    headingLine1: { type: String, required: true },
    headingLine2: { type: String, required: true },
    buttons: [buttonSchema],
}, { timestamps: true });

module.exports = mongoose.model('FooterContent', footerContentSchema);
