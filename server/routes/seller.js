const express = require('express');
const router = express.Router();
const sellerController = require("../app/controllers/SellerController");


//shop
router.get('/getShop/:id', sellerController.getShop);
router.get('/getAllShop', sellerController.getAllShop);
router.get('/getPendingShop/', sellerController.getPendingShop);
//Category
router.post('/:id/postCategory', sellerController.postCategory);
router.get('/:id/getCategory', sellerController.getCategory);
router.put('/:id/updateCategory/:categoryId', sellerController.updateCategory);
router.put('/:id/delteteCategory/:categoryId', sellerController.deleteCategory);
//Product
router.post('/:id/postProduct', sellerController.postProduct);
router.get('/:id/getProducts', sellerController.getProducts);
router.get('/:id/getProduct/:productId', sellerController.getProductById);
router.get('/:id/getProductByCategory/:cId', sellerController.getProductByCategory);
router.put('/:id/updateProduct/:productId', sellerController.updateProduct);
router.put('/:id/deleteProduct/:productId', sellerController.deleteProduct);
// //Order
router.get('/:id/getOrders', sellerController.getOrders);
router.put('/:id/updateOrder/:orderId', sellerController.updateOrder);
// //Promotion
router.post('/:id/postPromotion', sellerController.postPromotion);
router.get('/:id/getPromotion', sellerController.getPromotion);
router.put('/:id/deletePromotion/:promotionId', sellerController.deletePromotion);
// //Transaction

// //Review
// router.post('/:id/postReview', sellerController.postReview);
// router.get('/:id/getReview', sellerController.getReview);
// router.get('/:id/getReview/:reviewId', sellerController.getReviewById);
// router.put('/:id/updateReview/:reviewId', sellerController.updateReview);
// router.delete('/:id/deleteReview/:reviewId', sellerController.deleteReview);


module.exports = router;