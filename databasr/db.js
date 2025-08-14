const mongoose = require('mongoose')

const connectDb = async () => {
   await mongoose.connect('mongodb+srv://sarang:x9ye8VZyMhMayYn7@cluster0.xa4bkck.mongodb.net/Portfolio')
}

module.exports = connectDb; 