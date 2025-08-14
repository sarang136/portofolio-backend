const mongoose = require('mongoose')

const connectDb = async () => {
   await mongoose.connect('mongodb+srv://harshadbankar1596:harshadbankar@cluster0.fx9sgmn.mongodb.net/Portfolio')
}

module.exports = connectDb; 