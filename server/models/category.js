const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating Category collection
const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)
module.exports = categorySchema
module.exports = mongoose.model('Category', categorySchema)
