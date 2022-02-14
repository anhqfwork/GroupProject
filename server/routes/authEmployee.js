const express = require('express')
const router = express.Router()
const { login, signup } = require('../controller/authEmployee')
const { verifyUserToken, verifyEmployeeToken, adminToken, employeeToken } = require('../middleware/auth')

const Employee = require('../models/user.js')

router.get('/', verifyUserToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employeeId).select('-password')
    if (!employee) {
      return res.status(400).json({ success: false, message: 'Employee not found' })
    }
    res.json({ success: true, employee })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Something went wrong' })
  }
})
router.post('/login', login)
// router.post('/signup', verifyEmployeeToken, adminToken, signup)
router.post('/signup', signup)


module.exports = router
