const express = require('express');
const router = express.Router();
const Hero = require('./HeroModel'); // Import the Hero model

// GET hero content
router.get('/', async (req, res) => {
    try {
        const hero = await Hero.findOne(); // get first (or only) document
        if (!hero) return res.status(404).json({ message: 'Hero content not found' });
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
