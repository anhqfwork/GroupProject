const express = require('express')
const router = express.Router()
const { verifyToken, verifyEmployeeToken, adminToken, employeeToken  } = require('../middleware/auth')
const employeeCtrl = require('../controller/employee')

router.get('/:id', verifyEmployeeToken, employeeCtrl.getEmployee)
router.get('/', verifyEmployeeToken, employeeCtrl.getAllEmployees)
router.patch('/:id', verifyEmployeeToken, employeeCtrl.updateEmployee)
router.delete('/:id', verifyEmployeeToken, adminToken, employeeCtrl.deleteEmployee)
router.patch('/:id/changePassword', verifyEmployeeToken, employeeCtrl.changePassword)
router.post('/searchSpecificEmployee', verifyEmployeeToken, employeeCtrl.searchSpecificEmployee)
module.exports = router
