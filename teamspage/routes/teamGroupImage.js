const express = require('express');
const multer = require('multer');
const path = require('path');
const TeamGroupImage = require('../models/TeamGroupImage');

const router = express.Router();

// Set up multer to store files in /public/uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'group-image-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// POST: Upload a new group image
router.post('/', upload.single('groupImage'), async (req, res) => {
    try {
        const newImage = new TeamGroupImage({
            imagePath: `/uploads/${req.file.filename}`
        });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: 'Error saving group image.' });
    }
});

// GET: Get the latest group image
router.get('/', async (req, res) => {
    try {
        const image = await TeamGroupImage.findOne().sort({ createdAt: -1 });
        if (!image) return res.status(404).json({ message: 'No group image found.' });
        res.json(image);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching group image.' });
    }
});

module.exports = router;
