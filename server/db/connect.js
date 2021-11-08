const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const conn = process.env.MONGO_URI

const connectDB = mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connectDB
