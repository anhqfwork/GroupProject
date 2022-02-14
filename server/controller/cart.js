const Cart = require('../models/cart')
const Product = require('../models/product')
const mongoose = require('mongoose')

const cartCtrl = {
    addToCart: async (req, res) => {
        const userId = req.userId
        const productId = req.body.productId
        console.log(productId)
        const quantity = req.body.quantity

        const item = {
            productId: productId,
            quantity: quantity,
        }

        const product = await Product.findOne({ _id: productId })
        if (!product) {
            return res
                .status(404)
                .json({ msg: `No product with id ${productId}` })
        }
        if (product.inStock === 0) {
            return res.status(400).json({ msg: `No product in stock` })
        }

        Cart.findOne({ userId: userId }, async (err, foundCart) => {
            if (foundCart) {
                let productsInCart = await Cart.findOne({
                    userId: userId,
                    cartItems: {
                        $elemMatch: {
                            productId: mongoose.Types.ObjectId(productId),
                        },
                    },
                })
                //if exists cart in cart items array
                let totalPrice = 0
                let totalQuantity = 0
                if (productsInCart) {
                    const updatedCart = await Cart.findOneAndUpdate(
                        {
                            userId: userId,
                            cartItems: { $elemMatch: { productId: productId } },
                        },
                        { $inc: { 'cartItems.$.quantity': quantity } },
                        { new: true }
                    )
                    for (let i = 0; i < updatedCart.cartItems.length; i++) {
                        const product = await Product.findOne({
                            _id: mongoose.Types.ObjectId(
                                updatedCart.cartItems[i].productId
                            ),
                        })
                        totalPrice +=
                            updatedCart.cartItems[i].quantity * product.price
                        totalQuantity += updatedCart.cartItems[i].quantity
                    }
                    updatedCart.price = totalPrice
                    updatedCart.quantity = totalQuantity
                    updatedCart.save()
                    return res.status(200).json({
                        message: 'Quantity changed in the cart',
                        updatedCart,
                    })
                } else {
                    foundCart.cartItems.push(item)
                    for (let i = 0; i < foundCart.cartItems.length; i++) {
                        const product = await Product.findOne({
                            _id: mongoose.Types.ObjectId(
                                foundCart.cartItems[i].productId
                            ),
                        })
                        totalPrice +=
                            foundCart.cartItems[i].quantity * product.price
                        totalQuantity += foundCart.cartItems[i].quantity
                    }
                    foundCart.price = totalPrice
                    foundCart.quantity = totalQuantity
                    foundCart.save()
                    return res.status(200).json({
                        message: 'Push new item to cart',
                        foundCart,
                    })
                }
            } else {
                const cart = await Cart.create({
                    userId: userId,
                    cartItems: [item],
                })
                let totalPrice = 0
                let totalQuantity = 0
                const product = await Product.findOne({
                    _id: mongoose.Types.ObjectId(productId),
                })
                totalPrice += quantity * product.price
                totalQuantity += quantity
                cart.price = totalPrice
                cart.quantity = totalQuantity
                cart.save()
                return res.status(200).json({ message: 'Added to cart', cart })
            }
        })
    },

    getUserCartInfo: async (req, res) => {
        const userId = req.userId
        Cart.findOne({ userId: userId }, async (err, foundCart) => {
            if (err) {
                return res
                    .status(404)
                    .json({ message: "Couldn't find user cart", err })
            } else {
                for (let i = 0; i < foundCart.cartItems.length; i++) {
                    const product = await Product.findOne({
                        _id: mongoose.Types.ObjectId(
                            foundCart.cartItems[i].productId
                        ),
                    })
                    foundCart.cartItems[i].product = product
                }
                foundCart.save()
                return res.status(200).json({
                    message: 'Here is your cart ',
                    foundCart,
                })
            }
        })
    },

    removeFromCart: async (req, res) => {
        const userId = req.body.userId
        const productId = req.body.productId

        const foundCart = await Cart.findOneAndUpdate(
            { userId: userId },
            {
                $pull: {
                    cartItems: { productId: productId },
                },
            },
            { new: true }
        )
        foundCart.price = 0
        foundCart.quantity = 0
        console.log('Found Cart', foundCart)

        for (let i = 0; i < foundCart.cartItems.length; i++) {
            const product = await Product.findOne({
                _id: foundCart.cartItems[i].productId,
            })
            foundCart.price += foundCart.cartItems[i].quantity * product.price
            foundCart.quantity += foundCart.cartItems[i].quantity
        }

        console.log('Final FoundCart', foundCart)

        foundCart.save()

        return res.status(200).json({
            message: 'Remove the cart successfully',
            foundCart,
        })
    },
}

module.exports = cartCtrl
