
const { models } = require('../models');
const reuse = require('../reuse/reuse');

class BuyerController {
    viewProfileInformation = async (req, res) => {
        try {
            const {buyerId} = req.params
            const user = await models.User.findByPk(buyerId)
            return res.status(200).json({message: 'User found successfully', user})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    editProfileInformation = async (req, res) => {
        try {
            const {buyerId} = req.params
            const {username, email, phoneNumber, imageURL} = req.body

            const user = await models.User.findByPk(buyerId)
            if (!user) {
                return res.status(404).json({ error: 'User not found' }); 
            }

            await user.update({
                username: username,
                email: email,
                phone: phoneNumber, //user thieu phone number r 
                imageURL: imageURL
            })
            return res.status(200).json({ message: 'Update user sucessfully' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    viewAllPaymentMethod = async (req, res) =>{
        try {
            const {buyerId} = req.params

            paymentMethodList = await models.PaymentMethod.findAll({
                where: {
                    userId: buyerId
                }
            })

            return res.status(200).json({ message: 'List of payment method of user:', paymentMethodList });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    addPaymentMethod = async (req, res) =>{ 
        try {
            const {buyerId} = req.params;
            const {bankName, bankAccountNumber} = req.body

            const newPaymentMethod = models.PaymentMethod.create({
                userId: buyerId,
                bankName: bankName,
                bankAccountNumber: bankAccountNumber
            })

            return res.status(200).json({ message: 'Create payment method sucessfully', newPaymentMethod });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    removePaymentMethod = async (req, res) =>{
        try {
            const {buyerId, paymentId} = req.params;

            const paymentMethodToBeDeleted = await models.PaymentMethod.findByPk(id);
            if (!paymentMethodToBeDeleted) {
                return { error: 'Payment method not found' };
            }

            await paymentMethodToBeDeleted.destroy()
            return res.status(200).json({ message: 'Payment method removed sucessfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    setDefaultPaymentMethod = async (req, res) =>{
        try {
            const {buyerId, paymentId} = req.params;

            await models.PaymentMethod.findOne({
                where: {
                    userId: buyerId,
                    inUsed: true
                }
            }).update({
                inUsed: false
            })

            const updatedPaymentMethod = models.PaymentMethod.findByPk(paymentId)
            if (!paymentMethodToBeDeleted) {
                return { error: 'Payment method not found' };
            }

            await updatedPaymentMethod.update({
                inUsed: true
            })
            return res.status(200).json({ message: 'Sucessfully change default payment method', updatedPaymentMethod });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const {buyerId} = req.params;
            const {productId, quantity} = req.body;

            const product = models.Product.findByPk(productId)
            if (!product) {
                return res.status(400).json({ error: 'Found no product with this id' });
            }

            if (product.stock < quantity) {
                return res.status(405).json({ error: 'Doesnt have enough item to add to cart' });
            }

            const cart = await models.Cart.create({buyerId, productId, quantity}) 
            if (!cart) {
                return res.status(400).json({ error: 'failed to add item to cart' });
            }
            await product.update({
                stock: product.stock - quantity
            })
            
            return res.status(200).json({message: 'Add item to cart sucessfully', cart})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    removeProductFromCart = async (req, res) => {
        try {
            const {buyerId, productId} = req.params;

            const productToBeRemoved = await models.Cart.findOne({
                where: {
                    userId: buyerId,
                }
            })

            if (!productToBeRemoved) {
                return res.status(404).json({ error: 'Product not found in cart' });
            }

            await productToBeRemoved.destroy()

            const productToBeUpdated = await models.Product.findByPk(productId)
            await productToBeUpdated.update({
                stock: productToBeUpdated.stock + productToBeRemoved.quantity
            })

            return res.status(200).json({ message: 'Product removed from cart sucessfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    viewCart = async (req, res) => {
        try {
            const {buyerId} = req.params
            const cartItems = models.Cart.findAll({
                where: {
                    userId: buyerId,
                }
            })

            return res.status(200).json({message: 'Item in cart found successfully', cartItems})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    proceedWithCheckout = async (req, res) => {
        try {
            const {buyerId} = req.params

            const cartItems = models.Cart.findAll({
                where: {
                    userId: buyerId,
                }
            })
            if (cartItems.length === 0) {
                return res.status(404).json({ error: 'No product in cart to proceed' });
            }
            await models.Order.create({
                buyerId: buyerId
            })
            const orderJustCreated = await models.Order.findOne({
                where: {
                    userId: buyerId,
                },
                order: [ [ 'createdAt', 'DESC' ]]
            })
            let priceTotal = 0
            const orderItems = await Promise.all(
                cartItems.map(async (cartItem) => {
                    priceTotal += cartItem.price
                    const orderItem = await models.OrderDetail.create({
                        orderId: orderJustCreated.id,
                        productId: cartItem.productId,
                        quantity: cartItem.quantity,
                        priceAtPurchase: cartItem.price
                    });
                    return orderItem
                })
            )

            await models.Cart.destroy({
                where: {
                    userId: buyerId
                }
            })

            await orderJustCreated.update({totalPrice: priceTotal })

            return res.status(200).json({message: 'Successfully place order'})

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports = new BuyerController();
