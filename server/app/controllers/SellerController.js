const jwt = require('jsonwebtoken');
const { models } = require('../models');
const { all } = require('../../routes/seller');
const PaymentMethod = require('../models/PaymentMethod');
const { or } = require('sequelize');

class SellerController {
    //Shop
    getShop = async (req, res) =>{
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'user ID is required' });
            }
            
            const shop = await models.Shop.findOne({ where: { ownerId:id } });

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
            const {id} = req.params;
            const categories = await models.Category.findAll({where : {shopId : id}});
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
            const { name, price, description, quantity, category,discount} = req.body;
            const thumbnailURL = req.file ? req.file.path : 'D:\GitHub\Ecommercial_Platform\client\public\Pictures\defaut\Product.jpg'; 
            
            if (!id) {
                return res.status(400).json({ error: 'Shop ID is required' });
            }
            const shop = await models.Shop.findOne({ where: { id } });
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }

            const salePrice = price * (1 - (discount || 0) / 100);

            const newProduct = await models.Product.create({
                shopId: id,
                name,
                description,
                price,
                thumbnailURL: thumbnailURL,
                ownerId: shop.ownerId,
                salePrice: salePrice || 0,
                status: 'active',
                stock: quantity || 0,
            });
            if (category.length > 0) {
                for (const categoryName of category) {
                    const category = await models.Category.findOne({ where: { name: categoryName }});
                    if (!category) {
                        return res.status(404).json({ error: 'Category not found' });
                    }
                    await models.ProductCategory.create({
                        productId: newProduct.id,
                        categoryId: category.id
                    });
                }
            }

            return res.status(201).json({ product: newProduct, category: category });
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getProducts = async (req, res) => {
        try {
            const { id } = req.params;
            const products = await models.Product.findAll({ where: { shopId: id }});
        
            if (!products.length) {
                return res.status(404).json({ error: 'Products not found' });
            }
            const allProducts = [];
            for (const product of products) {
                if (product.thumbnailURL) {
                    product.thumbnailURL = product.thumbnailURL.replace('D:\\GitHub\\Ecommercial_Platform\\client\\public\\', '/',); // Normalize the path
                    product.thumbnailURL = `${req.protocol}://${req.get('host')}/${product.thumbnailURL}`;
                }
                const categories = await models.ProductCategory.findAll({ where: { productId: product.id } });
                const categoryNames = [];
                for (const category of categories) {
                    const categoryData = await models.Category.findOne({ where: { id: category.categoryId } });
                    if (categoryData) {
                        categoryNames.push(categoryData.name);
                    }
                }
                const reviewProduct = await models.Review.findAll({ where: { productId: product.id }});
                const totalRating = reviewProduct.reduce((acc, review) => acc + review.rating, 0);
        
                allProducts.push({
                    ...product.toJSON(),
                    categories: categoryNames,
                    totalRating: totalRating / reviewProduct.length || 0,
                });
            }
                        if (category.length > 1) {
               for (const categoryName of category) {
                    const category = await models.Category.findOne({ where: { name: categoryName }});
                    if (!category) {
                        return res.status(404).json({ error: 'Category not found' });
                    }
                    await models.ProductCategory.create({
                        productId: product.id,
                        categoryId: category.id
                    });
                }
            } else{
                await models.ProductCategory.create({
                    productId: product.id,
                    categoryId: await models.Category.findOne({ where: { name: category[0] }}).id
                });
            }
        
            return res.json(allProducts);
        } catch (error) {
            console.error(error);
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
                product.thumbnailURL = product.thumbnailURL.replace('D:\\GitHub\\Ecommercial_Platform\\client\\public\\', '/',); // Normalize the path
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
                    product.thumbnailURL = product.thumbnailURL.replace('D:\\GitHub\\Ecommercial_Platform\\client\\public\\', '/',); // Normalize the path
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
            const { name, price, description, quantity, category,discount, status} = req.body;

            const salePrice = price * (1 - (discount || 0) / 100);

            const product = await models.Product.findOne({ where: { id: productId, shopId: id }});
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            const thumbnailURL = req.file ? req.file.path : product.thumbnailURL; 
            await product.update({
                name: name || product.name,
                price: price || product.price,
                description: description || product.description,
                thumbnailURL: thumbnailURL,
                salePrice: salePrice || product.salePrice,
                status: status ||  product.status,
                stock: quantity || product.stock
            });
            await models.ProductCategory.destroy({ where: { productId: productId }});

            if (category.length > 0) {
                for (const categoryName of category) {
                    const category = await models.Category.findOne({ where: { name: categoryName }});
 
                    if (!category) {
                        return res.status(404).json({ error: 'Category not found' });
                    }
                    await models.ProductCategory.create({
                        productId: product.id,
                        categoryId: category.id
                    });
                }
            }

            return res.status(200).json({ product, category });
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
            const ordersDetails = await models.OrderDetail.findAll({ where: { shopId: id }});

            const allOrders = [];
            const allProducts = [];
            const seenOrderIds = new Set();

            for (const orderDetail of ordersDetails) {
                
                const orders = await models.Order.findAll({ where: { id: orderDetail.orderId } });
                if (!orders || orders.length === 0) {
                    return res.status(404).json({ error: 'Orders not found' });

                }
                for (const order of orders) {
                    if(seenOrderIds.has(order.id)){
                        continue;
                    }
                    const transaction = await models.Transaction.findOne({ where: { orderId: order.id } });
                    const buyer = await models.User.findOne({ where: { id: order.buyerId }});

                    
                    seenOrderIds.add(order.id);
                    allOrders.push({
                        ...order.toJSON(),
                        buyerName:buyer.fullName,
                        transaction: transaction ? transaction.toJSON() : null,
                    });
                    
                }
                const product = await models.Product.findOne({ where: { id: orderDetail.productId } });
                product.thumbnailURL = product.thumbnailURL.replace('D:\\GitHub\\Ecommercial_Platform\\client\\public\\', '/',); // Normalize the path
                if (product) {
                    allProducts.push({
                        name: product.name,
                        thumbnailURL: `${req.protocol}://${req.get('host')}/${product.thumbnailURL}`,
                        orderId: orderDetail.orderId,
                    });
                }
                            
            }
    
            return res.status(200).json({ allOrders, allProducts });
    
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

            const order = await models.Order.findOne({ where: { id: orderId }});
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
            const { title} = req.body;
            const thumbnailURL = req.file ? req.file.path : 'D:\GitHub\Ecommercial_Platform\client\public\Pictures\defaut\Product.jpg'; 
            if (!thumbnailURL) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const shop = await models.Shop.findOne({ where: { id } });
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }
            const newPromotion = await models.Promotion.create({
                shopId: id,
                title,
                imageURL: thumbnailURL,
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
                    promotion.imageURL = promotion.imageURL.replace('D:\\GitHub\\Ecommercial_Platform\\client\\public\\', '/',); // Normalize the path
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
    //Dashboard
    getDashboard = async (req, res) => {
        try {
            const { id } = req.params;
            const shop = await models.Shop.findOne({ where: { id } });
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }

            const completedOrders = await models.Order.findAll({ where: { shopId: id, status: 'completed' }});
            const orderDetails = await models.OrderDetail.findAll({ where: { orderId: completedOrders.map(order => order.id) }});
            const totalSales = orderDetails.reduce((total, detail) => total + (detail.priceAtPurchase * detail.quantity), 0);
            const totalProducts = await models.Product.count({ where: { shopId: id }});
            const totalOrders = await models.Order.count({ where: { shopId: id }});
            const totalCategories = await models.Category.count({ where: { shopId: id }});

            return res.status(200).json({
                totalProducts,
                totalOrders,
                totalSales,
                totalCategories
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //Information
    getInformation = async (req, res) => {
        try {
            const { id } = req.params;
            const shop = await models.Shop.findOne({ where: { id } });
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }
            if (shop.imageUrl) {
                shop.imageUrl = `${req.protocol}://${req.get('host')}/${shop.imageUrl}`;
            }

            return res.status(200).json({ shop });
        } catch (error) {
            console.error('Error fetching information:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    updateInformation = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, imageUrl, address, phoneNumber, email, bankAccount, bankName} = req.body;
            const shop = await models.Shop.findOne({ where: { id } });
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }

            await shop.update({
                name : name || shop.name,
                imageUrl : imageUrl || shop.imageUrl,
                address : address || shop.address,
                phoneNumber : phoneNumber || shop.phoneNumber,
                email : email || shop.email,
                bankAccount : bankAccount || shop.bankAccount,
                bankName : bankName || shop.bankName,
            });

            return res.status(200).json({ shop });
        } catch (error) {
            console.error('Error updating information:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


}

module.exports = new SellerController();