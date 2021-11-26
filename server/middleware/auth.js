const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')
const Employee = require('../models/employee')
const verifyUserToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ success: false, message: 'Access token not found' })

  try {
    const decoded = jwt.verify(token, 'test')

    req.userId = decoded.userId
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ success: false, message: 'Invalid token' })
  }
}

const verifyEmployeeToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ success: false, message: 'Access token not found' })

  try {
    const decoded = jwt.verify(token, 'test')
    req.employeeId = decoded.employeeId
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ success: false, message: 'Invalid token' })
  }
}



const adminToken = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ _id: mongoose.Types.ObjectId(req.employeeId) })
    if (employee.isAdmin === true) {
      next()
    } else {
      return res.status(401).json({ success: false, message: 'This is for admin only' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Something went wrong' })
  }
}

const employeeToken = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ _id: req.result.employeeId })
    if (employee.isAdmin === false) {
      next()
    } else {
      return res.status(401).json({ success: false, message: 'This is for employee only' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Something went wrong' })
  }
}

module.exports = { verifyUserToken, verifyEmployeeToken, adminToken, employeeToken}
