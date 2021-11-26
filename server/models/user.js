const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    username: { type: String, trim: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    avatar: { type: String, default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
