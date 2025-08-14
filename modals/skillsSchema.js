
const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({

        skillName: {
            type: String,
            required: true
        },
        image: {
            type: String,
        }
 
})

module.exports = mongoose.model('skills', skillsSchema);