const express = require('express');
const router = express.Router();
const AboutUsModel = require('./AboutUsModel');

// GET about info
router.get('/', async (req, res) => {
    try {
        const aboutUsData = await AboutUsModel.findOne();
        console.log('Database data:', aboutUsData); // Add this line
        res.json(aboutUsData);
    } catch (error) {
        console.error('Error fetching About Us data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST or PUT for Admin (optional)
router.post('/', async (req, res) => {
    try {
        const existing = await AboutUsModel.findOne();
        if (existing) {
            const updated = await AboutUsModel.findByIdAndUpdate(existing._id, req.body, { new: true });
            return res.json(updated);
        } else {
            const created = new AboutUsModel(req.body);
            await created.save();
            return res.json(created);
        }
    } catch (error) {
        console.error('Error saving About Us data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
