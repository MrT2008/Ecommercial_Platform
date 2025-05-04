const express = require("express");
const router = express.Router();
const sellerController = require("../app/controllers/SellerController");
const upload = require('../app/middlewares/uploadFile');



//shop
router.get("/getShop/:id", sellerController.getShop);
router.get("/getAllShop", sellerController.getAllShop);
router.get("/getPendingShop/", sellerController.getPendingShop);
//Category
router.post("/:id/postCategory", sellerController.postCategory);
router.get("/:id/getCategory", sellerController.getCategory);
router.put("/:id/updateCategory/:categoryId", sellerController.updateCategory);
router.put("/:id/deleteCategory/:categoryId", sellerController.deleteCategory);
//Product
router.post('/:id/postProduct',upload.single('thumbnailURL'), sellerController.postProduct);
router.get("/:id/getProducts", sellerController.getProducts);
router.get("/:id/getProduct/:productId", sellerController.getProductById);
router.get("/:id/getProductByCategory/:cId", sellerController.getProductByCategory);
router.put('/:id/updateProduct/:productId',upload.single('thumbnailURL'), sellerController.updateProduct);
router.put("/:id/deleteProduct/:productId", sellerController.deleteProduct);
// //Order
router.get("/:id/getOrders", sellerController.getOrders);
router.put("/:id/updateOrder/:orderId", sellerController.updateOrder);
// //Promotion
router.post('/:id/postPromotion',upload.single('thumbnailURL'), sellerController.postPromotion);
router.get("/:id/getPromotion", sellerController.getPromotion);
router.put("/:id/deletePromotion/:promotionId", sellerController.deletePromotion);
// //dashboard
router.get("/:id/getDashboard", sellerController.getDashboard);

// //Information
router.get("/:id/getInformation", sellerController.getInformation);
router.put("/:id/updateInformation",upload.array('images', 5), sellerController.updateInformation);

<<<<<<< HEAD
// Chat box
router.post("/:id/createChat", sellerController.createChat);
router.get("/:id/getAllChat", sellerController.getAllChat);
router.get("/:id/getChat/:chatId", sellerController.getChatById);
router.post("/:id/postMessage", sellerController.postMessage);



// //Review
// router.post('/:id/postReview', sellerController.postReview);
// router.get('/:id/getReview', sellerController.getReview);
// router.get('/:id/getReview/:reviewId', sellerController.getReviewById);
// router.put('/:id/updateReview/:reviewId', sellerController.updateReview);
// router.delete('/:id/deleteReview/:reviewId', sellerController.deleteReview);
=======
>>>>>>> parent of a2fa6fb (Merge branch 'dev1' into merge-dev1)

module.exports = router;
