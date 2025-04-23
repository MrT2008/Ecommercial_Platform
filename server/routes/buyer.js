const express = require('express');
const router = express.Router();
const BuyerController = require('../app/controllers/BuyerController');

//Profile
router.get('/:buyerId/viewProfile', BuyerController.viewProfileInformation) //.
router.put('/:buyerId/editProfile', BuyerController.editProfileInformation) //.

//PaymentMethod
router.post('/:buyerId/payment/', BuyerController.addPaymentMethod) //.
router.get('/:buyerId/payment/', BuyerController.viewAllPaymentMethod) //.
router.put('/:buyerId/payment/setdefault', BuyerController.setDefaultPaymentMethod) //.
router.put('/:buyerId/payment/remove/', BuyerController.removePaymentMethod) //.

//cart
router.post('/:buyerId/product/addToCart', BuyerController.addProductToCart) //.
router.get('/:buyerId/cart', BuyerController.viewCart) //.
router.put('/:buyerId/cart/remove/', BuyerController.removeProductFromCart) //.

//Checkout
router.post('/:buyerId/checkout', BuyerController.proceedWithCheckout) //.

//Shipping Information
router.post('/:buyerId/shippingInfo', BuyerController.addShippingInfo) //. 
router.get('/:buyerId/shippingInfo', BuyerController.getAllShippingInfo) //.
router.put('/:buyerId/shippingInfo/setdefault', BuyerController.setDefaultShippingInformation) //.
router.put('/:buyerId/shippingInfo/remove', BuyerController.removeShippingInformation)


module.exports = router;