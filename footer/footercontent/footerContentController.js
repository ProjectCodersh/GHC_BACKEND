const FooterContent = require('./FooterContentModel');

// Get Footer Data
exports.getFooterContent = async (req, res) => {
    try {
        const content = await FooterContent.findOne().sort({ createdAt: -1 });
        if (!content) return res.status(404).json({ message: 'No footer content found.' });
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Footer Data
exports.updateFooterContent = async (req, res) => {
    try {
        const { headingLine1, headingLine2, buttons } = req.body;

        let content = await FooterContent.findOne();
        if (content) {
            content.headingLine1 = headingLine1;
            content.headingLine2 = headingLine2;
            content.buttons = buttons;
        } else {
            content = new FooterContent({ headingLine1, headingLine2, buttons });
        }

        const saved = await content.save();
        res.status(200).json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
