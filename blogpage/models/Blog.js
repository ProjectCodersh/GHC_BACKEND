const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    paragraphs: [{ type: String }],
    image: { type: String }, // Added image field
}, { timestamps: true });

// Virtual field: description = first paragraph
blogSchema.virtual('description').get(function () {
    return this.paragraphs && this.paragraphs.length > 0 ? this.paragraphs[0] : '';
});

// Ensure virtuals are included when converting to JSON or Object
blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

// Text search index
blogSchema.index({ title: 'text', paragraphs: 'text' });

module.exports = mongoose.model('Blog', blogSchema);