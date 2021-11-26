const express = require('express')
const router = express.Router()
const { login, signup } = require('../controller/authUser')
const {verifyUserToken, verifyEmployeeToken, adminToken, employeeToken } = require('../middleware/auth')

const User = require('../models/user.js')

router.get('/', verifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Something went wrong' })
  }
})
router.post('/login', login)
router.post('/signup', signup)

module.exports = router
