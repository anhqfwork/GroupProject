const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
      }
    ],
    paymentMethod:{type:String, required: true},
    status: {
      type:String, required: true, default: 'pending'
    },
    price: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingAddress:{type:String,},
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    
  },{
    timestamps:true
  }
)

module.exports = mongoose.model('Order', orderSchema)
