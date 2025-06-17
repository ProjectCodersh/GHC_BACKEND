const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: String,
    role: String,
    bio: String,
    imagePath: String,
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
