const express = require('express');
const router = express.Router();
const VideoSectionInfo = require('../models/VideoSectionInfo');

router.get('/', async (req, res) => {
    const videos = await VideoSectionInfo.find();
    res.json(videos);
});

module.exports = router;
