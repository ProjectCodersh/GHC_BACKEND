const Contact = require('../models/ContactModel');
const nodemailer = require('nodemailer');
const validator = require('validator');

// Email Transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const submitContact = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            address,
            email,
            serviceDate,
            services,
            helpText
        } = req.body;

        // Basic sanitization and validation
        if (!fullName || !phone || !address) {
            return res.status(400).json({ error: 'Full name, phone, and address are required.' });
        }

        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        if (!Array.isArray(services)) {
            return res.status(400).json({ error: 'Services must be an array.' });
        }

        // Save to database
        const contact = new Contact(req.body);
        await contact.save();

        // Admin Email
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Form Submission - Green Hammer',
            html: `
        <h2>New Work Request received:</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Date:</strong> ${serviceDate || 'N/A'}</p>
        <p><strong>Services:</strong> ${services.join(', ')}</p>
        <p><strong>Message:</strong><br>${helpText}</p>
      `
        };

        await transporter.sendMail(adminMailOptions);

        // Send confirmation email to user
        if (email) {
            const userMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Thanks for contacting Green Hammer Concrete!',
                html: `
          <p>Hi ${fullName},</p>
          <p>Thanks for reaching out. We’ve received your message and will be in touch shortly.</p>
          <hr>
          <p><strong>Your submission Request:</strong></p>
          <ul>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Service Date:</strong> ${serviceDate || 'N/A'}</li>
            <li><strong>Services:</strong> ${services.join(', ')}</li>
            <li><strong>Your Message:</strong> ${helpText}</li>
          </ul>
          <p>- Green Hammer Concrete Team</p>
        `
            };

            await transporter.sendMail(userMailOptions);
        }

        res.status(201).json({ message: 'Form submitted and emails sent successfully.' });
    } catch (error) {
        console.error('Error during contact form submission:', error);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
};

module.exports = { submitContact };
