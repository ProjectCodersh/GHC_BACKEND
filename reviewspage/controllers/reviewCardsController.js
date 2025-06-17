const ReviewCards = require('../models/ReviewCards');

// Get all reviews
const getReviewCards = async (req, res) => {
    try {
        const reviewCards = await ReviewCards.find().sort({ createdAt: -1 });
        res.json(reviewCards);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
};

// Add a new review
const addReviewCards = async (req, res) => {
    const { name, category, text, rating } = req.body;

    // Get image path if uploaded
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        const newReviewCards = new ReviewCards({
            name,
            category,
            text,
            rating,
            imagePath
        });

        await newReviewCards.save();
        res.status(201).json(newReviewCards);
    } catch (err) {
        res.status(400).json({ message: 'Failed to add review', error: err.message });
    }
};

module.exports = { getReviewCards, addReviewCards };
