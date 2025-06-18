const Service = require('../models/Service');

// GET all active services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true })
            .select('title slug shortDescription')
            .sort({ createdAt: -1 });

        res.json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching services',
            error: error.message
        });
    }
};

// GET service by slug
exports.getServiceBySlug = async (req, res) => {
    try {
        const service = await Service.findOne({
            slug: req.params.slug,
            isActive: true
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching service',
            error: error.message
        });
    }
};

// POST create a new service
exports.createService = async (req, res) => {
    try {
        const {
            title,
            shortDescription,
            galleryImages,
            paragraphs,
            metaTitle,
            metaDescription
        } = req.body;

        const newService = new Service({
            title,
            shortDescription,
            galleryImages,
            paragraphs,
            metaTitle,
            metaDescription
        });

        const savedService = await newService.save();

        res.status(201).json({
            success: true,
            data: savedService,
            message: 'Service created successfully'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Service with this title already exists (slug conflict)'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating service',
            error: error.message
        });
    }
};

// PUT update service
exports.updateService = async (req, res) => {
    try {
        const existingService = await Service.findById(req.params.id);
        if (!existingService) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        const updatableFields = [
            'title',
            'shortDescription',
            'galleryImages',
            'paragraphs',
            'metaTitle',
            'metaDescription',
            'isActive'
        ];

        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                existingService[field] = req.body[field];
            }
        });

        const updatedService = await existingService.save();

        res.json({
            success: true,
            data: updatedService,
            message: 'Service updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating service',
            error: error.message
        });
    }
};

// DELETE service
exports.deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);

        if (!deletedService) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting service',
            error: error.message
        });
    }
};
