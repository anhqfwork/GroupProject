const express = require('express')
const router = express.Router()
const { verifyUserToken, verifyEmployeeToken, adminToken, employeeToken } = require('../middleware/auth')
const productCtrl = require('../controller/product')
const orderCtrl = require('../controller/order')

// router.post('/', verifyEmployeeToken, productCtrl.createProduct)
// router.delete('/:id', verifyEmployeeToken, adminToken, productCtrl.deleteProduct)
// router.put('/:id', verifyUserToken, adminToken, productCtrl.updateProduct)

router.post('/', productCtrl.createProduct)
router.get('/', productCtrl.getAllProducts)
router.get('/getAllPublishers', productCtrl.getAllPublishers)
router.get('/:id', productCtrl.getProduct)
router.post('/searchSpecificProduct', productCtrl.searchSpecificProduct)
router.post('/productByCategory', productCtrl.getProductByCategory)
router.post('/filterProduct', productCtrl.filterProduct)
router.delete('/:id', productCtrl.deleteProduct)
router.put('/:id', productCtrl.updateProduct)

// router.get('/func/getFiveNewestProducts', verifyEmployeeToken, productCtrl.getFiveNewestProducts)
// router.get('/top', verifyUserToken, productCtrl.getTop10Products)
// router.post('/:id/review', verifyUserToken, productCtrl.createProductReview)
// router.patch('/:id/review', verifyUserToken, productCtrl.updateProductReview)
// router.delete('/:id/review', verifyUserToken, productCtrl.deleteProductReview)
// router.get('/:id/review', verifyUserToken, productCtrl.getAllReviews)
// router.get('/id:review/user', verifyUserToken, productCtrl.getUsersFromReviews)
// router.get('/func/getMostSoldProducts', verifyEmployeeToken, productCtrl.getMostSoldProducts)

router.get('/func/getFiveNewestProducts', productCtrl.getFiveNewestProducts)
router.get('/top', productCtrl.getTop10Products)
router.post('/:id/review', productCtrl.createProductReview)
router.patch('/:id/review', productCtrl.updateProductReview)
router.delete('/:id/review', productCtrl.deleteProductReview)
router.get('/:id/review', productCtrl.getAllReviews)
router.get('/id:review/user', productCtrl.getUsersFromReviews)
router.get('/func/getMostSoldProducts', productCtrl.getMostSoldProducts)

module.exports = router
