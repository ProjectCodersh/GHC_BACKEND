const express = require('express');
const router = express.Router();
const GetStarted = require('./GetStartedModel');

router.get('/', async (req, res) => {
    try {
        const data = await GetStarted.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
