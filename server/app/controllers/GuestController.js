const { on } = require('nodemailer/lib/xoauth2');
const { models } = require('../models');
const Category = require('../models/Category');
const reuse = require('../reuse/reuse');

class GuestController {
    searchProducts = async (req, res) => {
        try {
            const { keyword } = req.params;
            const products = await models.Product.findAll({
                where: {
                    name: {
                        [models.Sequelize.Op.like]: `%${keyword}%`,
                    },
                },
            });
            const allProducts = await reuse.getProducts(products, req);
            if (allProducts.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            
            res.status(200).json({ message: 'Products retrieved successfully', allProducts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    getAllProducts = async (req, res) => {
        try {
            const products = await models.Product.findAll();
            const allProducts = await reuse.getProducts(products, req);
            res.status(200).json({ message: 'Products retrieved successfully', allProducts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getAllProductsOnSale = async (req, res) => {
        try {
            const products = await models.Product.findAll();
            const onSaleProducts = products.filter(product => product.salePrice < product.price);

            res.status(200).json({ message: 'Products retrieved successfully', onSaleProducts });
        } catch (error) {
            console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
        }
    };

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
    getProductsByCategory = async (req, res) => {
        try {
            const { category } = req.params;
            
            const Category = await models.Category.findAll({
                where: {
                    name: category
                },
            });
            if (Category.length === 0) {
                return res.status(404).json({ message: 'No categories found' });
            }

            const ProductCategory = await models.ProductCategory.findAll({
                where: { categoryId: Category.map(c => c.id) }
            });
            const products =[]
            for (const product of ProductCategory) {
                const productDetails = await models.Product.findOne({
                    where: { id: product.productId },
                });
                
                products.push(productDetails)
            }
            const allProducts = await reuse.getProducts(products, req);
            if (allProducts.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
        
            res.status(200).json({ message: 'Products retrieved successfully', allProducts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    getProductByCategoryId = async (req, res) => {
        try {
            const { id } = req.params;
            const Category = await models.Category.findAll({
                where: {
                    id: id
                },
            });
            if (Category.length === 0) {
                return res.status(404).json({ message: 'No categories found' });
            }

            const ProductCategory = await models.ProductCategory.findAll({
                where: { categoryId: Category.map(c => c.id) }
            });
            const products =[]
            for (const product of ProductCategory) {
                const productDetails = await models.Product.findOne({
                    where: { id: product.productId },
                });
                
                products.push(productDetails)
            }
            const allProducts = await reuse.getProducts(products, req);
            if (allProducts.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
        
            res.status(200).json({ message: 'Products retrieved successfully', allProducts });
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
    getAllShops = async (req, res) => {
        try {
            const shops = await reuse.getAllShops();

            res.status(200).json({ message: 'Shops retrieved successfully', shops });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    getShopById = async (req, res) => {
        try {
            const { id } = req.params;
            const shop = await reuse.getShopById(id);
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }

            res.status(200).json({ message: 'Shop retrieved successfully', shop });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    getProductsByShopId = async (req, res) => {
        try {
            const { id } = req.params;
            const products = await models.Product.findAll({where: { shopId: id }});;

            const allProducts = await reuse.getAllProductsByShopId(products,req);
            if (!allProducts) {
                return res.status(404).json({ error: 'Products not found' });
            }

            res.status(200).json({ message: 'Products retrieved successfully', allProducts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    getCategoriesByShopId = async (req, res) => {
        try {
            const { id } = req.params;
            const category = await reuse.getCategoryById(id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            res.status(200).json({ message: 'Category retrieved successfully', category });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    getProductsByCategoryId = async (req, res) => {
        try {
            const { id,cId } = req.params;

            const ProductCategory = await models.ProductCategory.findAll({
                where: { categoryId: cId }
            });
            const products = await models.Product.findAll({
                where: { id: ProductCategory.map(pc => pc.productId) },
            });
            const allProducts = await reuse.getProducts(products,req);
            res.status(200).json({ message: 'Products retrieved successfully', allProducts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}

module.exports = new GuestController();