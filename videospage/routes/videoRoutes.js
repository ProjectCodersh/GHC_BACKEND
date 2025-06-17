const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

router.get('/', async (req, res) => {
    const videos = await Video.find();
    res.json(videos);
});

module.exports = router;
