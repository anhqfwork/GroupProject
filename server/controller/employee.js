const Employee = require('../models/employee')
const argon2 = require('argon2')
const mongoose = require('mongoose')
const { cloudinary } = require('../utils/cloudinary')
const { validateEmail, validatePasswordComplex } = require('../utils/validation')
const employeeCtrl = {

  getAllEmployees: async (req, res) => {
    try {
      const employee = await Employee.find()
      if (!user) {
        return res.status(400).json({ msg: 'Employee does not exist' })
      }
      res.status(200).json({ msg: 'Successfully get all employees', employee })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  getEmployee: async (req, res) => {
    try {
      Employee.findOne({ _id: req.params.id }, async (err, employee) => {
        if (err) {
          return res.status(400).json({ msg: 'Employee does not exist' })
        }else{
          res.status(200).json({ msg: 'Successfully get employee', employee })
        }
        
      }).select('-password')
      
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const { avatar, name, email, username, phoneNumber } = req.body
      if (!name) return res.status(400).json({ msg: 'Please add your full name.' })
      const uploadResponse = await cloudinary.uploader.upload(avatar, {
        upload_preset: 'image_backend'
      })
      const imageUrl = uploadResponse.url
      await Employee.findOneAndUpdate({ _id: req.employee._id }, { avatar: imageUrl, name, username, phoneNumber })

      res.status(200).json({ msg: 'Update Success' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id)
      res.status(200).json({ msg: 'Employee has been deleted' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  changePassword: async (req, res) => {
    try {
      const employeeId  = req.params.id
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
      Employee.findOneAndUpdate({ _id: mongoose.Types.ObjectId(employeeId) }, { $set: {password: hashedPassword} }, { new: true }, async (err, employee) => {
        if (err) {
          return res.status(400).json({ msg: 'Cannot change the password' })
        } else{
          if(employee.isAdmin===true){
            res.status(200).json({ msg: 'Admin has successfully updated the password', employee })
          }else{
            res.status(200).json({ msg: 'Employee has successfully updated the password', employee })
          }
          
        }
        
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  searchSpecificEmployee: async (req, res) => {
    try {
      const name = req.body.name
      // const reqexp = new RegExp('^' + name)
      const employee = await Employee.find({ name:  {$regex: '.*' + name + '.*' }} ).select('-password')
    
      if (!employee) {
        return res.status(400).json({ msg: 'Employee does not exist' })
      }
      res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

module.exports = employeeCtrl
