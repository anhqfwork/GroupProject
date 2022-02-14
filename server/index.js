const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const { cloudinary } = require('./utils/cloudinary')
const cors = require('cors')
const authUserRouter = require('./routes/authUser')
const authEmployeeRouter = require('./routes/authEmployee')
const userRouter = require('./routes/user')
const employeeRouter = require('./routes/employee')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const categoryRouter = require('./routes/category')
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)

app.use('/api/auth/user', authUserRouter)
app.use('/api/auth/employee', authEmployeeRouter)
app.use('/api/user', userRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/category', categoryRouter)

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'grp_prj'
        })
        console.log(uploadedResponse)
        res.json(uploadedResponse)
    } catch (err) {
        res.status(500).json({err: 'not gud ...'})
    }
})

const CONNECTION_URL =
    ' mongodb+srv://general:Mhb4Nsb@cluster0.ecg6n.mongodb.net/BookstoreDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`))
