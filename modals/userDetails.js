
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    yourName: {
        type: String,
        required: true
    },
    profileDescription: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('userDetails', userSchema);