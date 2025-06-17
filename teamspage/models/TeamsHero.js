const mongoose = require('mongoose');

const teamsHeroSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('TeamsHero', teamsHeroSchema);
