const Order = require('../models/order')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const mongoose = require('mongoose')
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51JuvvHCqW2W6SLaPwMYXye7WhYbh4oOx6qaWfBoxLZcViIF4Y80Jran31z45WsmEpOc8vLNOLWQ1GEVkefHmpn2M0073sEJ3dz')
const orderCtrl = {
  addToOrder: async (req, res) => {
    const lineItems = []
    const userId = req.userId
    const { orderItems, paymentMethod, totalPrice } = req.body
    const itemId = orderItems.map(item => item.product)
    const quantity = orderItems.map(item => item.quantity)
    console.log(itemId, quantity)
    for (let i = 0; i < quantity.length; i++) {
      //check in stock again
      const product = await Product.findOne({ _id: itemId[i] })
      if (product.inStock < quantity[i]) {
        res.status(400).json({ msg: 'Number of in stock not enough, please try again' })
      } else {
        product.inStock -= quantity[i]
        await product.save()
        // await Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(itemId[i]) }, { $inc: { inStock: -quantity[i] } })

        await Cart.findOneAndUpdate({ user: userId }, { $pull: { cartItems: { product: mongoose.Types.ObjectId(itemId[i]) } } })
      }
    }
    const cart = await Cart.findOneAndUpdate({ user: userId }, { $set: { price: 0 } })
    //line items add new user
    for (let item of orderItems) {
      const product = await Product.findOne({ _id: item.product })
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title
          },
          unit_amount: product.price * 100
        },
        quantity: item.quantity
      })
    }
    const session = stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'https://www.facebook.com',
      cancel_url: 'https://www.facebook.com',
      customer_details:"tung"
    })
    const order = await Order.create({
      user: userId,
      orderItems: orderItems,
      paymentMethod: paymentMethod,
      price: totalPrice,
      taxPrice: totalPrice * 0.15,
      totalPrice: totalPrice * 1.15,
      
    })

    return res.status(201).json({ msg: 'Successfully created a new order', order, cart, id: session.id })

    // })
  },
  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id
      const order = await Order.findOne({ _id: orderId })
      if (!order) {
        return res.status(404).json({ msg: 'Order does not exist' })
      }
      await Product.findByIdAndDelete(orderId)
      res.status(200).json({ msg: 'Order deleted successfully', order })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  updateOrder: async (req, res) => {
    try {
      const status = req.body.status
      const orderId = req.params.id
      const order = await Order.findOneAndUpdate(orderId, { $set: { status: status } }, { new: true })

      if (!order) {
        return res.status(404).json({ msg: `no order with id ${orderId}` })
      }
      return res.status(200).json({ msg: 'Successfully updated order', order })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  sortByCreatedDate: async (req, res) => {
    try {
      const order = await Order.find().sort({ _id: -1 }).limit(5)

      if (!order) {
        return res.status(404).json({ msg: 'no order found' })
      }
      return res.status(200).json({ msg: 'Successfully sort order', order })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  sortByStatusDate: async (req, res) => {
    try {
      const status = req.body.status
      const order = await Order.find({ status: status }).sort({ _id: -1 }).limit(5)

      if (!order) {
        return res.status(404).json({ msg: 'no order found' })
      }
      return res.status(200).json({ msg: 'Successfully sort order', order })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  groupOrderUser: async (req, res) => {
    try {
      const order = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date('2021-11-01T00:00:00.0Z'), $lt: new Date('2021-12-01T00:00:00.0Z') }
          }
        },
        {
          $group: {
            _id: '$user',
            totalAmount: { $sum: '$totalPrice' },
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: '$user' },
        {
          $project: {
            totalAmount: 1,
            count: 1,
            username: '$user.name',
            _id: 0
          }
        }
      ])
        .sort({ _id: -1 })
        .limit(5)

      // const user = await User.populate(order, {path:"name", select:{name:1}})
      return res.status(200).json({ msg: 'Successfully group order', order })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //loop 12 thang
  numberOfProductAndRevenue: async (req, res) => {
    try {
      const order = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date('2021-11-01T00:00:00.0Z'), $lt: new Date('2021-12-01T00:00:00.0Z') }
          }
        },
        {
          $group: {
            _id: '$user',
            totalAmount: { $sum: '$totalPrice' },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: '$totalAmount'
            },
            numberOfProducts: {
              $sum: '$count'
            }
          }
        }
        // {
        //   $lookup: {
        //     from: 'users',
        //     localField: '_id',
        //     foreignField: '_id',
        //     as: 'user'
        //   }
        // },
        // {$unwind:'$user'},
        // {
        //   $project: {
        //     totalAmount: 1,
        //     count: 1,
        //     username: '$user.name',
        //     _id:0
        //   }
        // }
      ])
        .sort({ _id: -1 })
        .limit(5)

      // const user = await User.populate(order, {path:"name", select:{name:1}})
      return res.status(200).json({ msg: 'Successfully group order', order })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  getUserOrderInfo: async (req, res) => {
    try {
      const userId = req.userId
      console.log(userId)
      const order = await Order.aggregate([
        {
          $match: {
            user: { $in: [mongoose.Types.ObjectId(userId)] },
            createdAt: { $gte: new Date('2021-11-01T00:00:00.0Z'), $lt: new Date('2021-12-01T00:00:00.0Z') }
          }
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
          }
        }
      ])
      return res.status(200).json({ msg: 'Successfully get order', order })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  checkOrderStatusComplete: async (req, res) => {
    try {
      const productId = req.params.id
      const userId = req.userId
      const order = await Order.find({ user: userId, orderItems: { $elemMatch: { product: mongoose.Types.ObjectId(productId) } }, status: 'complete' })

      if (order) {
        return res.status(200).json({ success: true })
      } else {
        return res.status(404).json({ success: false })
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  getAddressPNUser: async (req, res) => {
    try {
      const userId = req.userId
      const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) }).select('phoneNumber address')
      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' })
      }
      res.status(200).json({ msg: 'get User successfully', user })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }

  // markedAsDeliver: async (req, res) => {
  //   const orderId = req.params.id
  //   Order.findOneAndUpdate({ _id: orderId }, { $set: { status: { pending: false, delivered: true } } }, { new: true, useFindAndModify: false }, (err, order) => {
  //     if (err) {
  //       return res.status(400).json({
  //         message: "Couldn't marked as deliver",
  //         err
  //       })
  //     } else {
  //       return res.status(200).json({
  //         message: 'Marked as deliver',
  //         order
  //       })
  //     }
  //   })
  // },
  // switchPayment: async (req, res) => {
  //   const orderId = req.params.id
  //   Order.findOne({ _id: orderId }, async (err, order) => {
  //     if (!order) {
  //       return res.status(400).json({ msg: 'Order does not exist' })
  //     }
  //     console.log(order.paymentMethod)
  //     order.paymentMethod.card === false ? (order.paymentMethod = { card: true, money: false }) : { card: false, money: true }
  //     await order.save()
  //     return res.status(200).json({ msg: 'Switch payment successfully', order })
  //   })
  // }
}
module.exports = orderCtrl
