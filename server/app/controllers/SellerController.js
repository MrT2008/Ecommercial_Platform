const jwt = require('jsonwebtoken');
const { models } = require('../models');

class SellerController {
    getShop = async (req, res) =>{
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'Shop ID is required' });
            }
            
            const shop = await models.Shop.findOne({ where: { id } });

            if (!shop) {
                return res.status(404).json({ error: 'Ngan Sad Thu' });
            }
            const shopData = shop.toJSON();

            if (shopData.imageUrl) {
                // You may need to prepend the base URL if it's a relative path
                shopData.imageUrl = `${req.protocol}://${req.get('host')}/${shopData.imageUrl}`;
            }

            return res.status(200).json({
                data: { shop: shopData}
            });
        } catch (error) {
            console.error('Error fetching shop:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    getAllShop = async (req, res) => {
        const allShop = await models.Shop.findAll();
        return res.status(200).json(allShop);

    };
}

module.exports = new SellerController();