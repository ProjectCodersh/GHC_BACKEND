const express = require('express');
const router = express.Router();
const TeamsHero = require('../models/TeamsHero');

// GET all hero section entries
router.get('/', async (req, res) => {
    try {
        const data = await TeamsHero.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new hero entry (optional for admin use)
router.post('/', async (req, res) => {
    const { heading, description, backgroundImage } = req.body;

    try {
        const newHero = new TeamsHero({ heading, description, backgroundImage });
        const saved = await newHero.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
