const express = require('express');
const router = express.Router();
const GuestController = require('../app/controllers/GuestController');

//GET
router.get('/product', GuestController.getAllProducts);
router.get('/product/onSale', GuestController.getAllProductsOnSale);
router.get('/product/:id', GuestController.getProductById);
router.get('/promotions', GuestController.getAllPromotions);

router.get('/shops', GuestController.getAllShops);
router.get('/shop/:id', GuestController.getShopById);
router.get('/shop/:id/products', GuestController.getProductsByShopId);

router.get('/shop/:id/categories', GuestController.getCategoriesByShopId);
router.get('/shop/:id/products/:cId', GuestController.getProductsByCategoryId);





module.exports = router;