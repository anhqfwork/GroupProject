const express = require('express')
const router = express.Router()
const { verifyUserToken, verifyEmployeeToken, adminToken, employeeToken } = require('../middleware/auth')
const userCtrl = require('../controller/user')

// router.get('/:id', verifyUserToken, userCtrl.getUser)
router.patch('/:id', verifyUserToken, userCtrl.updateUser)
// router.delete('/:id', verifyEmployeeToken, adminToken, userCtrl.deleteUser)
// router.get('/getAllUsers', verifyEmployeeToken, adminToken, userCtrl.getAllUsers)
// router.patch('/:id/changePassword', verifyUserToken, userCtrl.changePassword)
// router.post('/searchSpecificUser', verifyEmployeeToken, userCtrl.searchSpecificUser)
// router.get('/func/getUsersPlusMonth', verifyEmployeeToken, userCtrl.getUsersPlusMonth)
// router.get('/func/getFiveNewestUsers', verifyEmployeeToken, userCtrl.getFiveNewestUsers)

router.get('/userStatics', userCtrl.getUserStatics)
router.get('/getAllUsers', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getUser)
// router.patch('/:id', userCtrl.updateUser)
router.delete('/:id', userCtrl.deleteUser)
router.patch('/:id/changePassword', userCtrl.changePassword)
router.post('/searchSpecificUser', userCtrl.searchSpecificUser)
router.get('/func/getUsersPlusMonth',userCtrl.getUsersPlusMonth)
router.get('/func/getFiveNewestUsers',userCtrl.getFiveNewestUsers)

module.exports = router

