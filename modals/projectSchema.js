
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    skillsUsed: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('projects', projectSchema);