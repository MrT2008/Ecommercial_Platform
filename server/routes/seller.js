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


module.exports = router;
