const express = require('express');
const router = express.Router();
const GuestController = require('../app/controllers/GuestController');

//GET
router.get('/product', GuestController.getAllProducts);
// router.get('/product/onSale', GuestController.getAllProductsOnSale);
router.get('/productGetById', GuestController.getProductById);
router.get('/promotions', GuestController.getAllPromotions)



module.exports = router;