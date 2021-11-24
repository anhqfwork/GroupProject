const Category = require('../models/category')
const Product = require('../models/product')

const categoryCtrl = {
  //Get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({})
      if (!categories) {
        return res.status(404).json({ msg: 'Category does not exist' })
      }
      res.status(200).json({ msg:"Get all categories successfully", categories })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //Get specific category
  getCategory: async (req, res) => {
    try {
      const { id } = req.params.id
      const category = await Category.findOne({ _id: id })
      if (!category) {
        return res.status(404).json({ msg: 'Category does not exist' })
      }
      res.status(200).json({ category })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //Create category
  createCategory: async (req, res) => {
    try {
      const name = req.body.name
      const category = await Category.findOne({ name })
      if (category) {
        return res.status(404).json({ msg: 'Category already exists' })
      }
      const newCategory = await Category.create(req.body)
      res.status(201).json({ msg: 'Successfully created a new category', category: newCategory })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //Update category
  updateCategory: async (req, res) => {
    try {
      const id = req.params.id
      const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
        new: false,
      })
      
     
      if (!category) {
        return res.status(404).json({ msg: `no category with id ${id}` })
      }
      const name=category.name
      Product.find({category:name},(err, products) => {
        if(err){
          return res.status(404).json({ msg: `no category with name ${name}` })
        }
        products.forEach(product => {
          for (let i=0;i<product.category.length;i++){
            if(product.category[i]===nameBefore){
              product.category[i]=name
              break
            }
          }
          product.save()
        })
        
      })
      return res.status(200).json({ msg: 'Successfully updated category', category })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //delete category
  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id
      const category = await Category.findOne({ _id: id})
      const name=category.name
      console.log(name)
      const book = await Product.findOne({ category:name })
      if (book) {
        return res.status(404).json({ msg: 'You have to delete all books with that category' })
      }
      await Category.findByIdAndDelete(id)
      res.status(200).json({ msg: 'Category deleted successfully', category })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

module.exports = categoryCtrl