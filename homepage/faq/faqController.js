
// controllers/faqController.js - Alternative Controller Pattern
const { Faq, FaqSection } = require('./FaqModel');

const faqController = {
    // Get all active FAQs with section settings
    getAllFaqs: async (req, res) => {
        try {
            const faqs = await Faq.find({ isActive: true })
                .sort({ order: 1, createdAt: 1 })
                .select('-__v');

            const sectionSettings = await FaqSection.findOne({ isActive: true })
                .select('-__v') || {
                heading: 'Frequently asked questions',
                sideImage: {
                    url: '/assets/img/hero-bg.webp',
                    alt: 'FAQ visual',
                    height: '500'
                }
            };

            res.json({
                success: true,
                data: {
                    faqs: faqs,
                    section: sectionSettings
                },
                count: faqs.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching FAQs',
                error: error.message
            });
        }
    },

    // Create FAQ
    createFaq: async (req, res) => {
        try {
            const { question, answer, order = 0 } = req.body;

            if (!question || !answer) {
                return res.status(400).json({
                    success: false,
                    message: 'Question and answer are required'
                });
            }

            const faq = new Faq({ question, answer, order });
            await faq.save();

            res.status(201).json({
                success: true,
                data: faq,
                message: 'FAQ created successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating FAQ',
                error: error.message
            });
        }
    },

    // Update section settings
    updateSectionSettings: async (req, res) => {
        try {
            const { heading, sideImage } = req.body;

            let sectionSettings = await FaqSection.findOne({ isActive: true });

            if (!sectionSettings) {
                sectionSettings = new FaqSection({
                    heading: heading || 'Frequently asked questions',
                    sideImage: sideImage || {
                        url: '/assets/img/hero-bg.webp',
                        alt: 'FAQ visual',
                        height: '500'
                    }
                });
            } else {
                if (heading) sectionSettings.heading = heading;
                if (sideImage) sectionSettings.sideImage = { ...sectionSettings.sideImage, ...sideImage };
            }

            await sectionSettings.save();

            res.json({
                success: true,
                data: sectionSettings,
                message: 'FAQ section settings updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating FAQ section settings',
                error: error.message
            });
        }
    }
};

module.exports = faqController;