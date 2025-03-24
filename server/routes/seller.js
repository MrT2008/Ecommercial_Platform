const express = require('express');
const router = express.Router();
const sellerController = require("../app/controllers/SellerController");


//GET/ sellers
router.get('/getShop/:id', sellerController.getShop);
router.get('/getAllShop', sellerController.getAllShop);

module.exports = router;