const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

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

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/videosectioninfo', videoSectionInfoRoutes);
app.use('/api/teamshero', teamsHeroRoutes);
app.use('/api/teammembers', teamMemberRoutes); // ✅ New route
app.use('/api/teamgroupimage', teamGroupImageRoutes);
app.use('/api/reviewhero', reviewHeroRoutes);
app.use('/api/reviewcards', reviewCardsRoute);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
