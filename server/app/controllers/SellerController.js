const jwt = require('jsonwebtoken');
const { models } = require('../models');
const { all } = require('../../routes/seller');
const PaymentMethod = require('../models/PaymentMethod');

class SellerController {
    //Shop
    getShop = async (req, res) =>{
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'Shop ID is required' });
            }
            
            const shop = await models.Shop.findOne({ where: { id } });

            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
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
    getPendingShop = async (req, res) => {
        const pendingShop = await models.Shop.findAll({ where: { status: 'pending'}});
        if (!pendingShop) {
            return res.status(404).json({ error: 'Pending shop not found' });
        }
        return res.status(200).json(pendingShop);
    }

    //Category
    postCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!name ) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const newCategory = await models.Category.create({
                name,
                shopId: id
            });

            return res.status(201).json({ category: newCategory });
        } catch (error) {
            console.error('Error creating category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getCategory = async (req, res) => {
        try {
            const categories = await models.Category.findAll();
            return res.status(200).json({ categories });
        } catch (error) {
            console.error('Error fetching categories:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    updateCategory = async (req, res) => {
        try {
            const { id, categoryId } = req.params;
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const category = await models.Category.findOne({ where: { id: categoryId, shopId: id }});
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            await category.update({
                name
            });
            return res.status(200).json({ category });
        } catch (error) {
            console.error('Error updating category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    deleteCategory = async (req, res) => {
        try {
            const { id, categoryId } = req.params;
            const category = await models.Category.findOne({ where: { id: categoryId, shopId: id }});
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            await category.update({
                isActive: false
            });

            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    //Product
    postProduct = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'Shop ID is required' });
            }
            const shop = await models.Shop.findOne({ where: { id } });
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }
            const { name, price, description, thumbnailURL, stock, categoryId,salePrice,status} = req.body;
            if (!name || !price || !description || !thumbnailURL || !stock) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const newProduct = await models.Product.create({
                shopId: id,
                name,
                description,
                price,
                thumbnailURL,
                ownerId: shop.ownerId,
                salePrice: salePrice || 0,
                status: status || 'active',
                stock
            });
            categoryId.forEach(async (categoryId) => {
                const category = await models.Category.findOne({ where: { id: categoryId }});
                if (!category) {
                    return res.status(404).json({ error: 'Category not found' });
                }
                await models.ProductCategory.create({
                    productId: newProduct.id,
                    categoryId: categoryId
                });
            });
            return res.status(201).json({ product: newProduct });
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getProducts = async (req, res) => {
        try {
            const { id } = req.params;
            const products = await models.Product.findAll({ where: { shopId: id }});
            if (!products) {
                return res.status(404).json({ error: 'Products not found' });
            }
            allProducts = products.map(product => product.toJSON());
            products.forEach(product => {
                if (product.thumbnailURL) {
                    product.thumbnailURL = `${req.protocol}://${req.get('host')}/${product.thumbnailURL}`;
                }
                const categories = models.ProductCategory.findAll({ where: { productId: product.id }});
                product.categories = categories.map(category => category.categoryId);
            });

            return res.status(200).json({ products });
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getProductById = async (req, res) => {
        try {
            const { id, productId } = req.params;
            const product = await models.Product.findOne({ where: { id: productId, shopId: id }});
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            if (product.thumbnailURL) {
                product.thumbnailURL = `${req.protocol}://${req.get('host')}/${product.thumbnailURL}`;
            }

            return res.status(200).json({ product });
        } catch (error) {
            console.error('Error fetching product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getProductByCategory = async (req, res) => {
        try {
            const { cid } = req.params;
            const products = await models.Product.findAll({ where: { categoryId: cid }});
            if (!products) {
                return res.status(404).json({ error: 'Products not found' });
            }
            products.forEach(product => {
                if (product.thumbnailURL) {
                    product.thumbnailURL = `${req.protocol}://${req.get('host')}/${product.thumbnailURL}`;
                }
            });

            return res.status(200).json({ products });
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    updateProduct = async (req, res) => {
        try {
            const { id, productId } = req.params;
            const { name, price, description, thumbnailURL, stock, categoryId,salePrice,status} = req.body;
            if (!name || !price || !description || !thumbnailURL || !stock) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const product = await models.Product.findOne({ where: { id: productId, shopId: id }});
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            await product.update({
                name,
                price,
                description,
                thumbnailURL,
                salePrice: salePrice || 0,
                status: status || 'active',
                stock
            });
            await models.ProductCategory.destroy({ where: { productId: productId }});

            if (categoryId.length > 1) {
                categoryId.forEach(async (categoryId) => {
                    const category = await models.Category.findOne({ where: { id: categoryId }});
                    if (!category) {
                        return res.status(404).json({ error: 'Category not found' });
                    }
                    await models.ProductCategory.create({
                        productId: product.id,
                        categoryId: categoryId
                    });
                });
            } else{
                await models.ProductCategory.create({
                    productId: product.id,
                    categoryId: categoryId[0]
                });
            }

            return res.status(200).json({ product });
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    deleteProduct = async (req, res) => {
        try {
            const { id, productId } = req.params;
            const product = await models.Product.findOne({ where: { id: productId, shopId: id }});
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            await product.update({
                status: 'isdeleted'
            });
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //Order
    getOrders = async (req, res) => {
        try {
            const { id } = req.params;
    
            const orders = await models.Order.findAll({ where: { shopId: id } });
            if (!orders || orders.length === 0) {
                return res.status(404).json({ error: 'Orders not found' });
            }
    
            const allOrders = [];
            const allProducts = [];
    
            for (const order of orders) {
                const buyer = await models.User.findOne({ where: { id: order.buyerId } });
                const orderDetails = await models.OrderDetail.findAll({ where: { orderId: order.id } });
                const transaction = await models.Transaction.findOne({ where: { orderId: order.id } });
    

    
                for (const detail of orderDetails) {
                    const product = await models.Product.findOne({ where: { id: detail.productId } });
                    if (product) {
                        allProducts.push({
                            name: product.name,
                            thumbnailURL: `${req.protocol}://${req.get('host')}/${product.thumbnailURL}`,
                            buyerId: order.buyerId,
                        });
                    }
                }
    
                allOrders.push({
                    ...order.toJSON(),
                    buyerName:buyer.fullName,
                    paymentMethod : transaction.paymentMethod,
                });
            }
    
            return res.status(200).json({ allOrders,allProducts  });
    
        } catch (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    updateOrder = async (req, res) => {
        try {
            const { id, orderId } = req.params;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }

            const order = await models.Order.findOne({ where: { id: orderId, shopId: id }});
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            await order.update({
                status
            });
            return res.status(200).json({ order });
        } catch (error) {
            console.error('Error updating order:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //Promotion
    postPromotion = async (req, res) => {
        try {
            const { id } = req.params;
            const { imageURL } = req.body;
            if (!imageURL) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const shop = await models.Shop.findOne({ where: { id } });
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }
            const newPromotion = await models.Promotion.create({
                shopId: id,
                imageURL,
                status: 'show',
                banReason: null
            });

            return res.status(201).json({ promotion: newPromotion });
        } catch (error) {
            console.error('Error creating promotion:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getPromotion = async (req, res) => {
        try {
            const { id } = req.params;
            const promotions = await models.Promotion.findAll({ where: { shopId: id }});
            if (!promotions) {
                return res.status(404).json({ error: 'Promotions not found' });
            }
            promotions.forEach(promotion => {
                if (promotion.imageURL) {
                    promotion.imageURL = `${req.protocol}://${req.get('host')}/${promotion.imageURL}`;
                }
            });

            return res.status(200).json({ promotions });
        } catch (error) {
            console.error('Error fetching promotions:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    deletePromotion = async (req, res) => {
        try {
            const { id, promotionId } = req.params;
            const promotion = await models.Promotion.findOne({ where: { id: promotionId, shopId: id }});
            if (!promotion) {
                return res.status(404).json({ error: 'Promotion not found' });
            }
            await promotion.update({
                status: 'isDeleted'
            });
            return res.status(200).json({ message: 'Promotion deleted successfully' });
        } catch (error) {
            console.error('Error deleting promotion:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    //Review


}

module.exports = new SellerController();