const mongoose = require('mongoose');

// Single FAQ item schema
const faqItemSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { _id: false });

// FAQ Section schema
const faqSectionSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        default: 'Frequently asked questions',
        trim: true
    },
    sideImage: {
        url: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: 'FAQ visual'
        }
    },
    faqs: [faqItemSchema]
}, {
    timestamps: true
});

faqSectionSchema.index({ 'faqs.order': 1 });

const FaqSection = mongoose.model('FaqSection', faqSectionSchema);

module.exports = FaqSection;
