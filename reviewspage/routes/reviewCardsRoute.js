// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const { getReviewCards, addReviewCards } = require('../controllers/reviewCardsController');

router.get('/', getReviewCards);
router.post('/', addReviewCards); // optional: for adding reviews manually

module.exports = router;
