const express = require('express');
const multer = require('multer');
const TeamMember = require('../models/TeamMemeber');
const path = require('path');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
    const { name, role, bio } = req.body;
    const imagePath = req.file.path;

    try {
        const newMember = new TeamMember({ name, role, bio, imagePath });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save team member' });
    }
});

// Get all members
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team members' });
    }
});

module.exports = router;
