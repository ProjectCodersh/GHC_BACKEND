const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


// Videos Page
const videoRoutes = require('./videospage/routes/videoRoutes');
const videoSectionInfoRoutes = require('./videospage/routes/videoSectionInfo');
// Teams Page
const teamsHeroRoutes = require('./teamspage/routes/teamsHero');
const teamMemberRoutes = require('./teamspage/routes/teamRoutes');
const teamGroupImageRoutes = require('./teamspage/routes/teamGroupImage');
// Reviews Page
const reviewHeroRoutes = require('./reviewspage/routes/reviewHero');
const reviewCardsRoute = require('./reviewspage/routes/reviewCardsRoute');
// Blog Page
const blogRoutes = require('./blogpage/routes/blogRoutes');
// Services Page
const serviceRoutes = require('./servicespage/routes/service');
// Photos Page
const mediaRoutes = require('./photospage/routes/media');
const mediaHeroRoutes = require('./photospage/routes/mediaHero');
// Contact Page
const contactRoutes = require('./contactpage/routers/contactRoutes');
// Footer Component
const footerContentRoutes = require('./footer/footercontent/footerContentRoutes');
const footerNavigationRoutes = require('./footer/footernavigation/footerNavigationRoutes');
// Homepage Components
const aboutUsRoutes = require('./homepage/aboutus/aboutUsRoutes');
const faqRoutes = require('./homepage/faq/faqRoutes');




// Middleware
const app = express();
app.use(cors());
app.use(express.json());


// ✅ Serve static image files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('/uploads'));


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/greenhammer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// ✅ Contact Page Rate Limiter
const contactLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3,
    message: { error: 'Too many submissions. Please try again shortly.' }
});


// Routes
// app.get("/api/videos",)
app.use('/api/videos', videoRoutes);    // Videos Page
app.use('/api/videosectioninfo', videoSectionInfoRoutes);
app.use('/api/teamshero', teamsHeroRoutes);     // Teams Page
app.use('/api/teammembers', teamMemberRoutes);
app.use('/api/teamgroupimage', teamGroupImageRoutes);
app.use('/api/reviewhero', reviewHeroRoutes);       // Reviews Page
app.use('/api/reviewcards', reviewCardsRoute);
app.use('/api/blogs', blogRoutes);      // Blog Page
app.use('/api/services', serviceRoutes);        // Services Page
app.use('/api/media', mediaRoutes);     // Photos Page
app.use('/api/mediahero', mediaHeroRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);     // Contact Page
app.use('/api/footercontent', footerContentRoutes);   // Footer Component
app.use('/api/footernavigation', footerNavigationRoutes); // Footer Navigation Component
app.use('/api/about', aboutUsRoutes); // Homepage About Us Component
app.use('/api/faq', faqRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


