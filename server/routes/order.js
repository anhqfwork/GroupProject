const express = require('express')
const router = express.Router()
const { verifyUserToken, verifyEmployeeToken, adminToken, employeeToken } = require('../middleware/auth')
const orderCtrl = require('../controller/order')

router.post('/addToOrder', verifyUserToken, orderCtrl.addToOrder)

// router.get('/orderInfo', verifyUserToken, orderCtrl.getUserOrderInfo)
// router.get('/:id/checkOrderStatusComplete',verifyUserToken, orderCtrl.checkOrderStatusComplete)

router.get('/getRevenue', orderCtrl.getRevenue)
router.get('/getBookSold', orderCtrl.getBookSold)

router.get('/car', orderCtrl.numberOfProductAndRevenue)
router.get('/', orderCtrl.getAllOrders)
// router.post('/addToOrder', orderCtrl.addToOrder)

router.get('/:id', orderCtrl.getOrder)

router.get('/orderInfo', orderCtrl.getUserOrderInfo)
router.get('/:id/checkOrderStatusComplete', orderCtrl.checkOrderStatusComplete)

//add to order check in stock 1 lan nua DONE
///filter by status, frontend chon status, backend lay full order DONE
//search nhung quyen sach ban chay nhat, product+ so luong DONE
//decline add lai number in stock, chuyen status waiting for decline
//5 quyen sach moi nhat DONE
//5 nguoi dung moi nhat DONE
//+ them bao nhieu nguoi dung trong 1 thang DONE
//check payment method
//add payment method va customer name vao stripe
//get address and phone number of user DONE

// router.put('/:id', verifyEmployeeToken,  orderCtrl.updateOrder)
// router.delete('/:id', verifyEmployeeToken, orderCtrl.deleteOrder)
// router.get('/sortOrderByStatusDate',verifyEmployeeToken, orderCtrl.sortByStatusDate)
// router.get('/groupOrder',verifyEmployeeToken,orderCtrl.groupOrderUser)
// router.get('/car',verifyEmployeeToken,orderCtrl.numberOfProductAndRevenue)
// router.get('/getAddressPNUser', verifyUserToken, orderCtrl.getAddressPNUser)
// router.get('/sortOrderByCreatedDate',orderCtrl.sortByCreatedDate)

router.put('/:id', orderCtrl.updateOrder)
router.delete('/:id', orderCtrl.deleteOrder)
router.get('/sortOrderByStatusDate',orderCtrl.sortByStatusDate)
router.get('/groupOrder', orderCtrl.groupOrderUser)
router.get('/getAddressPNUser', orderCtrl.getAddressPNUser)
router.get('/sortOrderByCreatedDate', orderCtrl.sortByCreatedDate)

module.exports = router
