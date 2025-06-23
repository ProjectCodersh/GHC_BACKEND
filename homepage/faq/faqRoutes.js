const express = require('express');
const router = express.Router();
const FaqSection = require('./FaqModel');
const multer = require('multer');
const path = require('path');

// Multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

// GET single FAQ section
router.get('/', async (req, res) => {
    try {
        const section = await FaqSection.findOne();
        res.json(section);
    } catch (err) {
        console.error('Error fetching FAQ section:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST or UPDATE FAQ section (Admin use)
router.post('/', upload.single('sideImage'), async (req, res) => {
    try {
        const { heading, faqs } = req.body;

        // Parse FAQ array if stringified
        const parsedFaqs = typeof faqs === 'string' ? JSON.parse(faqs) : faqs;

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const faqSectionData = {
            heading,
            sideImage: {
                url: imageUrl,
                alt: req.body.sideImageAlt || 'FAQ visual'
            },
            faqs: parsedFaqs
        };

        let existing = await FaqSection.findOne();
        if (existing) {
            const updated = await FaqSection.findByIdAndUpdate(existing._id, faqSectionData, { new: true });
            return res.json(updated);
        } else {
            const created = new FaqSection(faqSectionData);
            await created.save();
            return res.status(201).json(created);
        }
    } catch (err) {
        console.error('Error saving FAQ section:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
