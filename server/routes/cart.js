const express = require('express')
const router = express.Router()
const { verifyUserToken, verifyEmployeeToken, adminToken, employeeToken } = require('../middleware/auth')
const cartCtrl = require('../controller/cart')

router.post('/addToCart', verifyUserToken, cartCtrl.addToCart)
router.get('/userCartInfo', verifyUserToken, cartCtrl.getUserCartInfo)
router.put('/removeFromCart', verifyUserToken, cartCtrl.removeFromCart)
module.exports = router
