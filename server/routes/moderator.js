const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../app/middlewares/authenticate ');
const upload = require('../app/middlewares/uploadFile');

const ModeratorController = require('../app/controllers/ModeratorController');

router.post('/dashboard', authenticateToken, ModeratorController.getDashboardData);

router.post('/announcements/new', upload.single('imageURL'), authenticateToken, ModeratorController.sendAnnouncement);
router.put('/announcements/edit/:id', ModeratorController.editAnnouncementById);
router.put('/announcements/delete/:id', ModeratorController.deleteAnnouncementById);
router.get('/announcements', ModeratorController.getAllAnnouncements);

router.put('/shops/ban/:id', ModeratorController.banShopById);

router.get('/shops/pendings/', ModeratorController.getAllPendingShops);
router.put('/shops/approve/:id', ModeratorController.approveShopById);
router.put('/shops/reject/:id', ModeratorController.rejectShopById);
router.get('/shops/banned/', ModeratorController.getAllBannedShops);
router.put('/shops/unban/:id', ModeratorController.unbanShopById);
router.get('/shops/:id', ModeratorController.getShopById);
router.get('/shops/', ModeratorController.getAllActiveShops);

router.put('/promotions/delete/:id', ModeratorController.deletePromotionById);
router.get('/promotions', ModeratorController.getAllPromotions);

router.get('/users/:id', ModeratorController.getUserById);

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

module.exports = router;