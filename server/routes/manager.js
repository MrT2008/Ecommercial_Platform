const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../app/middlewares/authenticate ');
const upload = require('../app/middlewares/uploadFile');

const ManagerController = require('../app/controllers/ManagerController');

router.post('/dashboard', authenticateToken, ManagerController.getDashboardData);

router.post('/announcements/new', upload.single('imageURL'),authenticateToken, ManagerController.sendAnnouncement);
router.put('/announcements/edit/:id', ManagerController.editAnnouncementById);
router.put('/announcements/delete/:id', ManagerController.deleteAnnouncementById);
router.get('/announcements', ManagerController.getAllAnnouncements);

router.put('/shops/ban/:id', ManagerController.banShopById);
router.get('/shops/pendings/', ManagerController.getAllPendingShops);
router.put('/shops/approve/:id', ManagerController.approveShopById);
router.put('/shops/reject/:id', ManagerController.rejectShopById);
router.get('/shops/banned/', ManagerController.getAllBannedShops);
router.put('/shops/unban/:id', ManagerController.unbanShopById);
router.get('/shops/:id', ManagerController.getShopById);
router.get('/shops/', ManagerController.getAllActiveShops);

router.put('/promotions/delete/:id', ManagerController.deletePromotionById);
router.get('/promotions', ManagerController.getAllPromotions);

router.post('/moderators/new', ManagerController.createModerator);
router.put('/moderators/delete/:id', ManagerController.banModeratorById);
router.get('/moderators/', ManagerController.getAllModerators);

router.get('/users/:id', ManagerController.getUserById);

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

module.exports = router;