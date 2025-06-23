const express = require('express');
const router = express.Router();
const FooterNavigation = require('./FooterNavigationModel');

// GET Footer Navigation
router.get('/', async (req, res) => {
    try {
        const content = await FooterNavigation.findOne();
        res.json(content);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
