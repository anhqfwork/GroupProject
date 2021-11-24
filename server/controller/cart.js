const Cart = require('../models/cart')
const Product = require('../models/product')
const mongoose = require('mongoose')

const cartCtrl = {
  addToCart: async (req, res) => {
    const userId = req.userId
    const productId = req.query.productId
    console.log(productId)
    const quantity = req.body.quantity

    const item = {
      product: productId,
      quantity: quantity
    }

    const product = await Product.findOne({ _id: productId })
    if (!product) {
      return res.status(404).json({ msg: `No product with id ${productId}` })
    }
    if (product.inStock === 0) {
      return res.status(400).json({ msg: `No product in stock` })
    }

    Cart.findOne({ user: userId }, async (err, foundCart) => {
      if (foundCart) {
        let productsInCart = await Cart.findOne({ user: userId, cartItems: { $elemMatch: { product: mongoose.Types.ObjectId(productId) } } })
        //if exists cart in cart items array
        let totalPrice = 0
        if (productsInCart) {
          const updatedCart = await Cart.findOneAndUpdate(
            { user: userId, cartItems: { $elemMatch: { product: productId } } },
            { $set: { 'cartItems.$.quantity': quantity } },
            { new: true }
          )
          for (let i = 0; i < updatedCart.cartItems.length; i++) {
            const product = await Product.findOne({ _id: mongoose.Types.ObjectId(updatedCart.cartItems[i].product) })
            totalPrice += updatedCart.cartItems[i].quantity * product.price
          }
          updatedCart.price = totalPrice
          updatedCart.save()
          return res.status(200).json({
            message: 'Quantity changed in the cart',
            updatedCart
          })
        } else {
          foundCart.cartItems.push(item)
          for (let i = 0; i < foundCart.cartItems.length; i++) {
            const product = await Product.findOne({ _id: mongoose.Types.ObjectId(foundCart.cartItems[i].product) })
            totalPrice += foundCart.cartItems[i].quantity * product.price
          }
          foundCart.price = totalPrice
          foundCart.save()
          return res.status(200).json({
            message: 'Push new item to cart',
            foundCart
          })
        }
      } else {
        const cart = await Cart.create({ user: userId, cartItems: [item] })
        let totalPrice = 0
        const product = await Product.findOne({ _id: mongoose.Types.ObjectId(productId) })
        totalPrice += quantity * product.price
        cart.price = totalPrice
        cart.save()
        return res.status(200).json({ message: 'Added to cart', cart })
      }
    })
  },

  getUserCartInfo: async (req, res) => {
    const userId = req.userId
    Cart.findOne({ user: userId }, async (err, foundCart) => {
      if (err) {
        return res.status(404).json({ message: "Couldn't find user cart", err })
      } else if (foundCart.cartItems.length === 0) {
        return res.status(404).json({ message: 'No cart' })
      } else {
        return res.status(200).json({
          message: 'Here is your cart ',
          foundCart
        })
      }
    })
  },

  removeFromCart: async (req, res) => {
    const userId = req.userId
    const productId = req.query.productId
    const foundCart = await Cart.findOneAndUpdate(
      { user: mongoose.Types.ObjectId(userId) },
      { $pull: { cartItems: { product: mongoose.Types.ObjectId(productId) } } },
      { new: true }
    )
    const cartItems = foundCart.cartItems
    let totalPrice = 0
    for (let i = 0; i < cartItems.length; i++) {
      const product = await Product.findOne({ _id: cartItems[i].product })
      const price = product.price
      totalPrice += cartItems[i].quantity * price
    }
    foundCart.price = totalPrice
    foundCart.save()

    return res.status(200).json({
      message: 'Remove the cart successfully',
      foundCart
    })
  }
}

module.exports = cartCtrl
