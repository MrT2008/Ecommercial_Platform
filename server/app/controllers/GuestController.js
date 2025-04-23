const { models } = require('../models');
const reuse = require('../reuse/reuse');

class GuestController {
    getAllProducts = async (req, res) => {
        try {
            const products = await reuse.getAllProducts();

            if (products.length === 0) {
                return res.status(404).json({ error: 'No product found' });
            }
            
            const response = products.map(product => ({
                id: product.id,
                shopId: product.shopId,
                name: product.name,
                description: product.description,
                price: product.price,
                salePrice: product.salePrice,
                stock: product.stock,
                saled: product.saled,
                thumbnailURL: product.thumbnailURL,
            }));

            res.status(200).json({ message: 'Products retrieved successfully', response });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // getAllProductsOnSale = async (req, res) => {
    //     try {
    //         const saledProducts = await models.Product.findAll({
    //             where: {
    //                 saled: {
    //                     [Op.ne]: null,
    //                 }
    //             }
    //         }
    //         )
    //     } catch (error) {
    //         console.error(error);
    //             res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // };

    getProductById = async (req, res) => {
            try {
                const { id } = req.params;
        
                const product = await reuse.getProductById(id);
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }
        
                res.status(200).json({ message: 'Product retrieved successfully', product });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }

    getAllPromotions = async (req, res) => {
            try {
                const promotions = await reuse.getAllPromotions();

                const response = promotions.map(promotion => ({
                    id: promotion.id,
                    shopId: promotion.shopId,
                    imageURL: promotion.imageURL,
                }));

                res.status(200).json({ message: 'Promotions retrieved successfully', response });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
}

module.exports = new GuestController();