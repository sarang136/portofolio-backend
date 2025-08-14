
const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
    skills: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('skills', skillsSchema);