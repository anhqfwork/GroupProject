const User = require('../models/user')
const mongoose = require('mongoose')
const argon2 = require('argon2')
const { cloudinary } = require('../utils/cloudinary')
const { validateEmail, validatePasswordComplex } = require('../utils/validation')
const userCtrl = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find()
      console.log(user)
      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' })
      }
      res.status(200).json({ msg: 'Get all users', user })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).select('-password')
      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' })
      }
      res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateUser: async (req, res) => {
    try {
      const { avatar, name, email, address, username, phoneNumber } = req.body
      if (!name) return res.status(400).json({ msg: 'Please add your full name.' })
      const uploadResponse = await cloudinary.uploader.upload(avatar, {
        upload_preset: 'image_backend'
      })
      const imageUrl = uploadResponse.url
      await User.findOneAndUpdate({ _id: req.user._id }, { avatar: imageUrl, name, username, phoneNumber, address })

      res.json({ msg: 'Update Success' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ msg: 'User has been deleted' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  changePassword: async (req, res) => {
    try {
      const userId = req.params.id
      const { password, confirmedPassword } = req.body
      if (!confirmedPassword || !password) {
        return res.status(400).json({ success: false, msg: 'Please enter all the field' })
      }
      if (!validatePasswordComplex(password)) {
        return res
          .status(400)
          .json({ success: false, msg: 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long' })
      }
      if (password !== confirmedPassword) {
        return res.status(400).json({ success: false, msg: 'Password not match' })
      }
      const hashedPassword = await argon2.hash(password)
      User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(userId) }, { $set: { password: hashedPassword } }, { new: true }, async (err, user) => {
        if (err) {
          return res.status(400).json({ msg: 'Cannot change the password' })
        } else {
          res.status(200).json({ msg: 'User has successfully updated the password', user })
        }
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  searchSpecificUser: async (req, res) => {
    try {
      const name = req.body.name
      // const reqexp = new RegExp('^' + name)
      const user = await User.find({ name: { $regex: '.*' + name + '.*' } }).select('-password')

      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' })
      }
      res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  getUsersPlusMonth: async (req, res) => {
    try {
      const user = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date('2021-11-01T00:00:00.0Z'), $lt: new Date('2021-12-01T00:00:00.0Z') }
          }
        },
        {
          $count: 'number'
        }
      ])
      return res.status(200).json({ msg: 'Successfully get plus month', user })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  getFiveNewestUsers: async (req, res) => {
    try {
      const user = await User.find().sort({ _id: -1 }).limit(5)
      return res.status(200).json({ msg: 'Successfully get 5 newest user', user })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

module.exports = userCtrl
