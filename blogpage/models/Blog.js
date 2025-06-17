const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, // Make title unique
    date: { type: String, required: true },
    paragraphs: [{ type: String }],
    image: { type: String },
}, { timestamps: true });

// Virtual field: description = first paragraph
blogSchema.virtual('description').get(function () {
    return this.paragraphs && this.paragraphs.length > 0 ? this.paragraphs[0] : '';
});

// Virtual field: URL-safe slug from title
blogSchema.virtual('slug').get(function () {
    return this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
});

// Virtual field: Parsed date for sorting
blogSchema.virtual('parsedDate').get(function () {
    // Handle both formats: "JAN 14, 2025" and "2025-01-14"
    if (this.date.includes('-')) {
        return new Date(this.date);
    } else {
        // Parse format like "JAN 14, 2025"
        return new Date(this.date);
    }
});

// Ensure virtuals are included when converting to JSON or Object
blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

// Text search index
blogSchema.index({ title: 'text', paragraphs: 'text' });

module.exports = mongoose.model('Blog', blogSchema);