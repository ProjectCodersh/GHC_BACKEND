const express = require('express');
const router = express.Router();
const ReviewHero = require('../models/ReviewHero');

// Get Review Hero Content
router.get('/', async (req, res) => {
    try {
        const heroData = await ReviewHero.findOne();
        res.json(heroData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch review hero data' });
    }
});

// Update or Create Review Hero Content
router.post('/', async (req, res) => {
    try {
        const { heading, description, buttontext } = req.body;

        let heroData = await ReviewHero.findOne();
        if (heroData) {
            heroData.heading = heading;
            heroData.description = description;
            heroData.buttontext = buttontext;
        } else {
            heroData = new ReviewHero({ heading, description, buttontext });
        }

        await heroData.save();
        res.status(200).json(heroData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save review hero data' });
    }
});

module.exports = router;
