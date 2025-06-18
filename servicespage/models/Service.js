const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    galleryImages: [{
        type: String
    }],
    paragraphs: [{
        type: String
    }],
    metaTitle: String,
    metaDescription: String,
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to auto-generate slug
serviceSchema.pre('validate', function (next) {
    if (this.title && !this.slug) {
        const slugifiedTitle = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumerics with hyphens
            .replace(/(^-|-$)/g, '');    // Trim leading/trailing hyphens
        this.slug = `service-${slugifiedTitle}`;
    }
    next();
});

module.exports = mongoose.model('Service', serviceSchema);
