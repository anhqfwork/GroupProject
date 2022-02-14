const Product = require('../models/product')
const Order = require('../models/order')
const mongoose = require('mongoose')
const { cloudinary } = require('../utils/cloudinary')
const productCtrl = {
    //@desc create new book
    //@access admin
    createProduct: async (req, res) => {
        try {
            const {
                title,
                category,
                publisher,
                price,
                inStock,
                isbn,
                authorName,
                image,
            } = req.body
            // if (!image) {
            //   return res.status(400).json({ msg: 'Book needs to have an image' })
            // }
            // const uploadResponse = await cloudinary.uploader.upload(image, {
            //   upload_preset: 'image_backend'
            // })
            // const imageUrl = uploadResponse.url
            const product = await Product.findOne({ title })
            if (product) {
                return res.status(400).json({ msg: 'Product already exists' })
            }

            const newProduct = await Product.create(req.body)
            res.status(201).json({
                msg: 'Create a new product',
                book: newProduct,
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc delete a book
    //@access admin
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id
            const book = await Product.findOne({ _id: id })
            if (!book) {
                return res.status(404).json({ msg: `No book with id ${id}` })
            }
            await Product.findByIdAndDelete(id)
            res.status(200).json({ message: 'Book deleted successfully', book })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc update a book
    //@access admin
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id
            const book = await Product.findOneAndUpdate({ _id: id }, req.body, {
                new: true,
                runValidators: true,
            })
            if (!book) {
                return res.status(404).json({ msg: `no book with id ${id}` })
            }
            return res
                .status(200)
                .json({ msg: 'Successfully updated book', book })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc get all books
    //@access public
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find()
            if (!products) {
                return res.status(404).json({ msg: 'Product does not exist' })
            }
            const count = await Product.countDocuments()
            res.status(200).json({ msg: `Get all ${count} products`, products })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc get a specific book
    //@access public
    getProduct: async (req, res) => {
        try {
            const id = req.params.id
            console.log(id)
            const product = await Product.findOne({ _id: id })
            if (!product) {
                return res.status(404).json({ msg: 'Product does not exist' })
            }
            res.status(200).json({ msg: 'Get product successfully', product })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getAllPublishers: async (req, res) => {
        try {
            const publishers = await Product.distinct('publisher')
            console.log(publishers)
            res.status(200).json({ publishers })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    searchSpecificProduct: async (req, res) => {
        try {
            const title = req.body.title
            // const reqexp = new RegExp('^' + name)
            const product = await Product.find({
                title: new RegExp(title, 'i'),
            })

            if (!product) {
                return res.status(400).json({ msg: 'Product does not exist' })
            }
            const quantity = product.length
            res.status(200).json({ product, quantity })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getProductByCategory: async (req, res) => {
        try {
            const category = req.body.category
            // const reqexp = new RegExp('^' + name)
            const product = await Product.find({
                category: { $all: [category] },
            })

            if (!product) {
                return res.status(400).json({ msg: 'Product does not exist' })
            }
            res.status(200).json({ product })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    filterProduct: async (req, res) => {
        try {
            const { publisher, priceLarger, priceSmaller } = req.body
            // const reqexp = new RegExp('^' + name)
            const product = await Product.find({
                price: { $lt: priceSmaller, $gt: priceLarger },
                publisher: { $regex: publisher },
            })
            console.log(product)
            if (!product) {
                return res.status(400).json({ msg: 'Product does not exist' })
            }
            res.status(200).json({
                msg: 'Filter product successfully',
                product,
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc create a book review
    //@access public
    createProductReview: async (req, res) => {
        try {
            const { rating, comment } = req.body
            const userId = req.userId
            const product = await Product.findOne({ _id: req.params.id })
            if (product) {
                product.reviews.push({ rating, comment, userId })
                if (product.numberOfReviews == 0) {
                    product.ratings += rating
                } else {
                    product.ratings =
                        (product.ratings * product.numberOfReviews + rating) /
                        (product.numberOfReviews + 1)
                }
                product.numberOfReviews += 1

                await product.save()
                return res
                    .status(200)
                    .json({ msg: 'Successfully created the review', product })
            } else {
                return res.status(404).json({ msg: 'Product does not exist' })
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc create a book review
    //@access public
    updateProductReview: async (req, res) => {
        try {
            let totalRating = 0
            const { rating, comment } = req.body
            const userId = req.userId
            const id = req.params.id
            const product = await Product.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(id),
                    reviews: {
                        $elemMatch: { userId: mongoose.Types.ObjectId(userId) },
                    },
                },
                {
                    $set: {
                        'reviews.$.rating': rating,
                        'reviews.$.comment': comment,
                    },
                },
                { new: true }
            )
            const reviews = product.reviews

            for (let i = 0; i < reviews.length; i++) {
                totalRating += reviews[i].rating
            }
            product.ratings = totalRating / reviews.length
            await product.save()
            return res
                .status(200)
                .json({ msg: 'Successfully updated product review', product })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    deleteProductReview: async (req, res) => {
        try {
            let totalRating = 0
            const userId = req.userId
            const id = req.params.id
            const product = await Product.findOneAndUpdate(
                { _id: id },
                {
                    $pull: {
                        reviews: { userId: mongoose.Types.ObjectId(userId) },
                    },
                },
                { new: true }
            )
            const reviews = product.reviews
            if (reviews.length !== 0) {
                for (let i = 0; i < reviews.length; i++) {
                    totalRating += reviews[i].rating
                }
                product.ratings = totalRating / reviews.length
            } else {
                product.ratings = 0
            }
            product.numberOfReviews -= 1

            await product.save()
            return res.status(200).json({
                msg: 'Delete the rating successfully',
                product,
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc get top 10 most highest rated books
    //@access public
    getTop10Products: async (req, res) => {
        try {
            const products = await Product.find({})
                .sort({ rating: -1 })
                .limit(10)
            if (!products) {
                return res.status(404).json({ msg: 'Product does not exist' })
            }
            return res
                .status(200)
                .json({ msg: 'Top 10 rated products', products })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc get all reviews of a specific book
    //@access public
    getAllReviews: async (req, res) => {
        try {
            const id = req.params.id
            const book = await Book.findOne({ _id: id }, 'reviews').select(
                '-_id'
            )
            if (!book) {
                return res.status(404).json({ msg: 'Book does not exist' })
            }
            //   const review = await book.reviews
            return res.status(200).json({ msg: 'Get reviews', book })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getFiveNewestProducts: async (req, res) => {
        try {
            const product = await Product.find().sort({ _id: -1 }).limit(5)
            return res
                .status(200)
                .json({ msg: 'Successfully get 5 newest products', product })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getMostSoldProducts: async (req, res) => {
        try {
            const order = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(
                                new Date() - 7 * 60 * 60 * 24 * 1000
                            ),
                        },
                    },
                },
                { $project: { orderItems: 1 } },
                { $unwind: '$orderItems' },
                // { $unwind: '$orderItems.product' },
                // { $unwind: '$orderItems.product' },
                {
                    $group: {
                        _id: '$orderItems.product',
                        quantity: { $sum: '$orderItems.quantity' },
                    },
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'product',
                    },
                },
                { $unwind: '$product' },
                {
                    $project: {
                        quantity: 1,
                        _id: 1,
                        'product.title': 1,
                        'product.image': 1,
                    },
                },
            ])
                .sort({ quantity: -1 })
                .limit(5)
            return res
                .status(200)
                .json({ msg: 'Successfully get 5 most sold products', order })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //@desc get who reviews what
    //@access public
    getUsersFromReviews: async (req, res) => {
        try {
        } catch (error) {}
    },
}

module.exports = productCtrl
