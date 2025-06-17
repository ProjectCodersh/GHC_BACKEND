const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, getBlogBySlug, getBlogByTitle, addBlog } = require('../controllers/blogController');

// Get all blogs (sorted by latest date)
router.get('/', getBlogs);

// Get blog by slug (URL-friendly version of title)
router.get('/slug/:slug', getBlogBySlug);

// Get blog by exact title
router.get('/title/:title', getBlogByTitle);

// Get blog by MongoDB _id (kept for backward compatibility)
router.get('/:id', getBlogById);

// Add new blog
router.post('/', addBlog);

module.exports = router;