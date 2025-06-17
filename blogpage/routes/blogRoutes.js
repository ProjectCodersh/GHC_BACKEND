const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, getBlogByCustomId, addBlog } = require('../controllers/blogController');

// Get all blogs
router.get('/', getBlogs);

// Get blog by custom ID (recommended)
router.get('/id/:id', getBlogByCustomId);

// Get blog by MongoDB _id (if needed for backward compatibility)
router.get('/:id', getBlogById);

// Add new blog (Admin only)
router.post('/', addBlog);

module.exports = router;