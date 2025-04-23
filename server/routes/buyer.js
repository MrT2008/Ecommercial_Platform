const express = require('express');
const router = express.Router();
const BuyerController = require('../app/controllers/BuyerController');

//GET
//related to user information
router.get('/', BuyerController.viewProfileInformation)
router.get('/payment', BuyerController.viewAllPaymentMethod)

//related to shopping function
router.get('/cart', BuyerController.viewCart)

//-----------------------------------------------------------------------

//PUT
//related to user information
router.put('/payment/add', BuyerController.addPaymentMethod)

//related to shopping function
router.put('/product/:productId', BuyerController.addProductToCart)
router.put('/checkout', BuyerController.proceedWithCheckout)

//-----------------------------------------------------------------------

//POST
//related to user information
router.post('/', BuyerController.editProfileInformation)
router.post('/payment/remove/:paymentId', BuyerController.removePaymentMethod)
router.post('/payment/setdefault/:paymentId', BuyerController.setDefaultPaymentMethod)

//related to shopping function
router.post('/cart/remove/:productId', BuyerController.removeProductFromCart)

module.exports = router;