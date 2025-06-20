const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const rateLimit = require('express-rate-limit');


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
// Footer Content
const footerContentRoutes = require('./footer/footercontent/footerContentRoutes');



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

app.get("/api/herosection", (req, res) => {
    res.send("Welcome to Green Hammer API");
})

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
app.use('/api/footercontent', footerContentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


