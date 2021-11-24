const express = require('express')
const router = express.Router()
const { verifyUserToken, verifyEmployeeToken, adminToken, employeeToken } = require('../middleware/auth')
const categoryCtrl = require('../controller/category')

router.get('/:id', categoryCtrl.getCategory)
router.put('/:id', verifyEmployeeToken,  categoryCtrl.updateCategory)
router.delete('/:id', verifyEmployeeToken, categoryCtrl.deleteCategory)
router.get('/', categoryCtrl.getAllCategories)
router.post('/', verifyEmployeeToken,  categoryCtrl.createCategory)

module.exports = router
