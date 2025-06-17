const Blog = require('../models/Blog');

// Helper function to parse date for sorting
const parseDate = (dateString) => {
    // Handle both formats: "JAN 14, 2025" and "2025-01-14"
    if (dateString.includes('-')) {
        return new Date(dateString);
    } else {
        // Parse format like "JAN 14, 2025"
        return new Date(dateString);
    }
};

// Get all blogs sorted by latest date
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        // Sort by parsed date (latest first)
        const sortedBlogs = blogs.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA; // Latest first
        });

        res.json(sortedBlogs);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
};

// Get single blog by MongoDB _id (kept for backward compatibility)
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error('Error retrieving blog by _id:', err);
        res.status(500).json({ message: 'Error retrieving blog' });
    }
};

// Get single blog by title slug
const getBlogBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;

        // Find blog by converting title to slug format and comparing
        const blogs = await Blog.find();
        const blog = blogs.find(b => {
            const blogSlug = b.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            return blogSlug === slug;
        });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (err) {
        console.error('Error retrieving blog by slug:', err);
        res.status(500).json({ message: 'Error retrieving blog' });
    }
};

// Get single blog by exact title
const getBlogByTitle = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);

        const blog = await Blog.findOne({ title: title });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error('Error retrieving blog by title:', err);
        res.status(500).json({ message: 'Error retrieving blog' });
    }
};

// Add a new blog
const addBlog = async (req, res) => {
    try {
        const { title, date, paragraphs, image } = req.body;

        // Validation
        if (!title || !date || !paragraphs || !Array.isArray(paragraphs) || paragraphs.length === 0) {
            return res.status(400).json({
                message: 'Missing required fields: title, date, and paragraphs array'
            });
        }

        // Check if blog with this title already exists
        const existingBlog = await Blog.findOne({ title: title });
        if (existingBlog) {
            return res.status(409).json({ message: 'Blog with this title already exists' });
        }

        // Create new blog
        const newBlog = new Blog({
            title,
            date,
            paragraphs,
            image: image || null
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        console.error('Error adding blog:', err);
        if (err.code === 11000) {
            // Duplicate key error
            res.status(409).json({ message: 'Blog with this title already exists' });
        } else {
            res.status(400).json({ message: 'Failed to add blog', error: err.message });
        }
    }
};

module.exports = {
    getBlogs,
    getBlogById,
    getBlogBySlug,
    getBlogByTitle,
    addBlog
};