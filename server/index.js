const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const connectDB = require('./db/connect')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (err) {
        console.log(err)
    }
}

start()