// routes/reviewRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { getReviewCards, addReviewCards } = require('../controllers/reviewCardsController');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// GET all reviews
router.get('/', getReviewCards);

// POST a new review with optional image
router.post('/', upload.single('image'), addReviewCards);

module.exports = router;
