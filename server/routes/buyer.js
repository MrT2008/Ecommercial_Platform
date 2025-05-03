const express = require('express');
const router = express.Router();
const BuyerController = require('../app/controllers/BuyerController');
const upload = require('../app/middlewares/uploadFile');

//Profile
router.get('/:buyerId/viewProfile', BuyerController.viewProfileInformation) //.
router.put('/:buyerId/editProfile',upload.single('imageURL'), BuyerController.editProfileInformation) //.
//PaymentMethod
router.post('/:buyerId/payment/', BuyerController.addPaymentMethod) //.
router.get('/:buyerId/payment/', BuyerController.viewAllPaymentMethod) //.
router.put('/:buyerId/payment/setdefault', BuyerController.setDefaultPaymentMethod) //.
router.put('/:buyerId/payment/remove', BuyerController.removePaymentMethod) //.

//cart
router.post('/:buyerId/product/addToCart', BuyerController.addProductToCart) //.
router.get('/:buyerId/cart', BuyerController.viewCart) //.
router.put('/:buyerId/cart/update/', BuyerController.updateCart) //.
router.put('/:buyerId/cart/remove/', BuyerController.removeProductFromCart) //.

//Checkout
router.post('/:buyerId/checkout', BuyerController.proceedWithCheckout) //.
router.get('/:buyerId/order/:status', BuyerController.viewAllOrderByStatus) //.

//Shipping Information
router.post('/:buyerId/shippingInfo', BuyerController.addShippingInfo) //. 
router.get('/:buyerId/shippingInfo', BuyerController.getAllShippingInfo) //.
router.put('/:buyerId/shippingInfo/setdefault', BuyerController.setDefaultShippingInformation) //.
router.put('/:buyerId/shippingInfo/remove', BuyerController.removeShippingInformation)
router.put('/:buyerId/shippingInfo/edit', BuyerController.editShippingInformation) //

//Shop
router.post('/:buyerId/shop/create', BuyerController.createNewShop) //.

//Review
router.post('/:buyerId/review/addReview', BuyerController.addNewReview)
router.get('/:buyerId/review/', BuyerController.viewYourReviews) //.
router.put('/:buyerId/review/editReview', BuyerController.editReview) //.
router.put('/:buyerId/review/removeReview', BuyerController.removeReview) //.


module.exports = router;