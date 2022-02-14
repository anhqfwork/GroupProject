const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, default: 0 },
    cartItems: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        product: { type: Schema.Types.Object},
        quantity: { type: Number, required: true }
      }
    ],
    quantity: { type: Number, defailt: 0},
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Cart', cartSchema)
