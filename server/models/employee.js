const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    username: { type: String, trim: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String, default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Employee', employeeSchema)
