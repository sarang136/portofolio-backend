
const mongoose = require('mongoose');

const expSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    fromDate: {
        type: String,
        required : true,
    },
    toDate: {
        type: String,
        default : "Current"
    },
    address: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('experience', expSchema);