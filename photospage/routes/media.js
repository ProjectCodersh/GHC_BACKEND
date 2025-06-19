
// backend/routes/media.js
const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('file'), async (req, res) => {
    const { title } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const newMedia = new Media({
        title,
        filename: file.filename,
        type: file.mimetype.startsWith('video') ? 'video' : 'image',
    });

    await newMedia.save();
    res.json({ message: 'Uploaded successfully', media: newMedia });
});

router.get('/', async (req, res) => {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
});

module.exports = router;

