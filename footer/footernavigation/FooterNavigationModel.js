const mongoose = require('mongoose');

const FooterNavigationSchema = new mongoose.Schema({
    logo: String,
    companyName: String,
    location: String,
    email: String,
    contactText: String,
    bookNowText: String,
    bookNowLink: String,
    socialIcons: [{
        name: String,
        image: String,
        url: String
    }],
    companyLinks: [{
        label: String,
        url: String
    }],
    serviceAreas: [String],
    hours: [{
        day: String,
        time: String
    }],
    // poweredByLogo: String
});

module.exports = mongoose.model('FooterNavigation', FooterNavigationSchema);
