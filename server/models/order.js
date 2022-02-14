const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, required: true, ref: 'User', },
        user: { type: Schema.Types.Object, ref: 'User' },
        orderItems: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                product: { type: Schema.Types.Object },
                quantity: { type: Number, required: true },
                title: { type: String },
                price: { type: Number },
                image: { type: String },
            },
        ],
        paymentMethod: { type: String, required: true },
        status: {type: String, required: true, default: 'pending', },
        price: {type: Number, required: true, default: 0.0, },
        quantity: {type: Number, default: 0.0, require: true },
        shippingAddress: { type: String },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', orderSchema)
