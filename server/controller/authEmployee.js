const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const Employee = require('../models/employee.js')
const { validateEmail, validatePasswordComplex } = require('../utils/validation')
const secret = 'test'

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, msg: 'Please enter valid email' })
    }

    const existingEmployee = await Employee.findOne({ email: email })
    if (!existingEmployee) {
      return res.status(404).json({ msg: 'User does not exist' })
    }
    const isPasswordMatch = await argon2.verify(existingEmployee.password, password)
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: 'Password not correct' })
    }

    const token = jwt.sign({ email: existingEmployee.email, employeeId: existingEmployee._id }, secret, { expiresIn: '24h' })
    if(existingEmployee.isAdmin===true){
      res.status(200).json({ success: true, msg: 'Admin logged in successfully', result: existingEmployee, token: token })
    }else{
      res.status(200).json({ success: true, msg: 'Employee logged in successfully', result: existingEmployee, token: token })
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: 'Something went wrong' })
  }
}

exports.signup = async (req, res) => {
  const { email, password, confirmedPassword, name, username } = req.body
  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, msg: 'Please enter valid email' })
    }
    if (!validatePasswordComplex(password)) {
      return res
        .status(400)
        .json({ success: false, msg: 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long' })
    }
    if (!username || !email || !password || !name) {
      return res.status(400).json({ success: false, msg: 'Please enter all the field' })
    }
    if(password!==confirmedPassword) {
      return res.status(400).json({ success: false, msg: 'Password not match' })
    }
    const existingEmployee = await Employee.findOne({ email: email })
    if (existingEmployee) {
      return res.status(400).json({ success: false,msg: 'Employee already exist.' })
    }
    const hashedPassword = await argon2.hash(password)
    const result = await Employee.create({ email: email, password: hashedPassword, name, username})

    const token = jwt.sign({ email: result.email, employeeId: result._id }, secret, { expiresIn: '24h' })

    return res.status(201).json({ success: true, msg: 'Employee created successfully', result: result, token: token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, msg: 'Something went wrong' })
  }
}
