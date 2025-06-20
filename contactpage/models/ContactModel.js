const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: String,
    phone: String,
    address: String,
    email: String,
    serviceDate: String,
    services: [String],
    helpText: String,
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
