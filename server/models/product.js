const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = new Schema(
    {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    }
)

const productSchema = new Schema(
    {
        title: { type: String, default: '', required: true },
        category: [String],
        publisher: { type: String, default: '', required: true },
        price: { type: Number, default: 0, required: true },
        inStock: { type: Number, default: 0, required: true },
        isbn: { type: String, default: '', required: true },
        authorName: { type: String, default: '', required: true },
        image: {
            type: String,
            default:
                'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
            required: true,
        },
        description: { type: String, default: 'No description available' },
        publicationDate: { type: Date, default: Date.now() },
        numberOfReviews: { type: Number, default: 0 },
        ratings: { type: Number, default: 0.0 },
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)
