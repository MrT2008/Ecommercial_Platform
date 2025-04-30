
const { where, json } = require('sequelize');
const { models } = require('../models');
const reuse = require('../reuse/reuse');
const { response } = require('express');

class BuyerController {
    viewProfileInformation = async (req, res) => {
        try {
            const { buyerId } = req.params;
                    console.log(buyerId)
                    if (!buyerId) {
                        return res.status(400).json({ error: 'User ID is required' });
                    }
                    
                    const User = await models.User.findOne({ where: { id: buyerId } });
        
                    if (!User) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    const UserData = User.toJSON();
        
                    return res.status(200).json({
                        data: { User: UserData}
                    });
            } catch (error) {
                console.error('Error fetching User:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    }

    editProfileInformation = async (req, res) => {
        try {
            const {buyerId} = req.params
            const {fullName, email, phoneNumber, imageURL} = req.body

            const user = await models.User.findByPk(buyerId)
            if (!user) {
                return res.status(404).json({ error: 'User not found' }); 
            }

            await user.update({
                fullName: fullName,
                email: email,
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

            const paymentMethodList = await models.PaymentMethod.findAll({
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
            const {bankName, bankAccountNumber, inUsed} = req.body

            const user = await models.User.findOne({
                where:
                {
                    id: buyerId
                }
            })

            if (!user) {
                return res.status(400).json({ message: 'User not  found' });
            }

            const existingPaymentMethod = await models.PaymentMethod.findOne({
                where: {
                    userId: buyerId,
                    bankName, bankAccountNumber
                }
            })

            if (existingPaymentMethod) {
                return res.status(400).json({ message: 'Duplicated payment method' });
            }

            if (inUsed) {
                const previousDefaultMethod = await models.PaymentMethod.findOne({
                    where: {
                        userId: buyerId,
                        inUsed: true,
                        isDeleted: false
                    }
                })
                if (previousDefaultMethod) {
                    await previousDefaultMethod.update({
                        inUsed: false
                    })
                }
            }


            const newPaymentMethod = await models.PaymentMethod.create({
                userId: buyerId,
                bankName: bankName,
                bankAccountNumber: bankAccountNumber,
                inUsed: inUsed
            })
            return res.status(200).json({ message: 'Create payment method sucessfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    removePaymentMethod = async (req, res) =>{
        try {
            const {buyerId} = req.params;

            const {paymentId} = req.body;

            const paymentMethodToBeDeleted = await models.PaymentMethod.findByPk(paymentId);
            if (!paymentMethodToBeDeleted) {
                return { error: 'Payment method not found' };
            }
            await paymentMethodToBeDeleted.update({
                isDeleted: true
            })

            return res.status(200).json({ message: 'Payment method removed sucessfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    setDefaultPaymentMethod = async (req, res) =>{
        try {
            const {buyerId} = req.params;
            const {paymentId} = req.body;

            const previousDefaultMethod = await models.PaymentMethod.findOne({
                where: {
                    userId: buyerId,
                    inUsed: true,
                    isDeleted: false
                }
            })

            if (previousDefaultMethod) {
                await previousDefaultMethod.update({
                    inUsed: false
                })
            }

            const updatedPaymentMethod = await models.PaymentMethod.findByPk(paymentId)
            if (!updatedPaymentMethod) {
                return res.status(500).json({ error: 'Payment method not found' });
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

            const product = await models.Product.findByPk(productId)
            if (!product) {
                return res.status(400).json({ error: 'Found no product with this id' });
            }

            if (product.stock < quantity) {
                return res.status(405).json({ error: 'Doesnt have enough item to add to cart' });
            }

            const shop = await models.Shop.findByPk(product.shopId)
            if (!shop) {
                return  res.status(400).json({ error: 'failed to find shop' });
            }

            const existingCart = await models.Cart.findOne({
                where: {
                    userId: buyerId,
                    productId: productId,
                }
            })

            let cart = {}
            if (existingCart) {
                if (existingCart.isDeleted) {
                    await existingCart.update({
                        isDeleted: false,
                        quantity: quantity
                    })
                    
                } else {
                    const newQuantity = existingCart.quantity +  quantity
                    await existingCart.update({
                        quantity: newQuantity
                    })
                }
                const data = {
                    shopName: shop.name,
                    userId: existingCart.userId,
                    productId: existingCart.productId,
                    productName: product.name,
                    quantity: existingCart.quantity
                }
                cart = data
            } else {
                const newCart = await models.Cart.create({
                    userId: buyerId, 
                    productId, quantity
                }) 
                if (!newCart) {
                    return res.status(400).json({ error: 'failed to add item to cart' });
                }
                const data = {
                    shopName: shop.name,
                    userId: newCart.userId,
                    productId: newCart.productId,
                    productName: product.name,
                    quantity: newCart.quantity
                }
                cart = data
            }
            
            await product.update({
                stock: product.stock - quantity
            })
    
            return res.status(200).json({message: 'Add item to cart sucessfully', cart })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    removeProductFromCart = async (req, res) => {
        try {
            const {buyerId} = req.params;
            const {productId} = req.body;

            const productToBeRemoved = await models.Cart.findOne({
                where: {
                    userId: buyerId,
                    productId: productId
                }
            })

            if (!productToBeRemoved) {
                return res.status(404).json({ error: 'Product not found in cart' });
            }

            await productToBeRemoved.update({
                isDeleted: true
            })

            const productToBeUpdated = await models.Product.findByPk(productId)
            await productToBeUpdated.update({
                stock: productToBeUpdated.stock + productToBeRemoved.quantity
            })


            return res.status(200).json({ message: 'Product removed from cart sucessfully', productToBeRemoved });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    viewCart = async (req, res) => {
        try {
            const {buyerId} = req.params
            const cartItems = await models.Cart.findAll({
                where: {
                    userId: buyerId,
                }
            })
            const responseMessage = (!cartItems ? "No item in cart" : "Item in cart found successfully")

            return res.status(200).json({message: responseMessage , cartItems})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    proceedWithCheckout = async (req, res) => {
        try {
            const {buyerId} = req.params
            const {paymentMethod} = req.body
            const cartItems = await models.Cart.findAll({
                where: {
                    userId: buyerId,
                    isDeleted: false
                }
            })

            if (cartItems.length === 0) {
                return res.status(404).json({ error: 'No product in cart to proceed' });
            }
            await models.Order.create({
                buyerId: buyerId,
                totalPrice: 0
            })
            const orderJustCreated = await models.Order.findOne({
                where: {
                    buyerId: buyerId,
                },
                order: [ [ 'createdAt', 'DESC' ]]
            })
            let priceTotal = 0

            for (const cartItem of cartItems) {
                console.log(cartItem.salePrice)
                

                const productInCart = await models.Product.findByPk(cartItem.productId)
                
                if (!productInCart) {
                    return res.status(404).json({ error: 'Not found product in cart'});
                }

                const orderItem = await models.OrderDetail.create({
                    orderId: orderJustCreated.id,
                    productId: cartItem.productId,
                    shopId: productInCart.shopId,
                    quantity: cartItem.quantity,
                    priceAtPurchase: cartItem.quantity * productInCart.salePrice
                })
                priceTotal += orderItem.priceAtPurchase
            }

            await models.Cart.update(
                {
                    isDeleted: true
                }, {
                    where: {
                        userId: buyerId,
                        // productId: cartItem.productId,
                        isDeleted: false
                    }
                }
            )

            const newOrder = await orderJustCreated.update({totalPrice: priceTotal })
            const newTransaction = await models.Transaction.create({
                orderId: orderJustCreated.id,
                paymentMethod: paymentMethod,
            })

            return res.status(200).json({message: 'Successfully place order'})

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    //lm them ship infor (create, edit, setdefault)
    addShippingInfo = async (req, res) => {
        try {
            const {buyerId} = req.params
            const {receiverName, address, phone, status} = req.body

            const existingInfo  = await models.ShipInfo.findOne({
                where: {
                    userId: buyerId,
                receiverName: receiverName,
                address: address,
                phone: phone
                }
            })

            if (existingInfo) {
                return res.status(404).json({ error: 'Duplicate shipping information', existingInfo});
            }

            const newShipInfor = await models.ShipInfo.create({
                userId: buyerId,
                receiverName: receiverName,
                address: address,
                phone: phone,
                status: status
            })

            if (!newShipInfor) {
                return res.status(400).json({ error: 'Cant create new shipping information'});
            }

            return res.status(200).json({message: "Shipping information successfully created"})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getAllShippingInfo = async (req, res) => {
        try {
            const {buyerId} = req.params

            const userShippingInfo = await models.ShipInfo.findAll({
                where: {
                    userId: buyerId
                }
            })

            const resMessage = (!userShippingInfo ? "User have no shipping information" : "Sucessfully retrieve all user shipping information")
            
            return res.status(200).json({message: resMessage, userShippingInfo})

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    setDefaultShippingInformation = async (req, res) =>{
        try {
            const {buyerId} = req.params;
            const {id} = req.body;


            const previousDefaultShippingInformation = await models.ShipInfo.findOne({
                where: {
                    userId: buyerId,
                    status: "active"
                }
            })

            if (previousDefaultShippingInformation) {
                await previousDefaultShippingInformation.update({
                    status: "inactive"
                })
            }

            const updatedShippingInformation = await models.ShipInfo.findOne({
                where: {
                    id,
                    status: !"delete"
                }
            })
            if (!updatedShippingInformation) {
                return res.status(400).json({ error: 'Shipping Information not found' });
            }

            await updatedShippingInformation.update({
                status: "active"
            })
            return res.status(200).json({ message: 'Sucessfully change default shipping information', updatedShippingInformation });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    removeShippingInformation = async (req, res) => {
        try {
            const {buyerId} = req.params;

            const {id} = req.body;

            const shippingInformationToBeDeleted = await models.ShipInfo.findByPk(id);
            if (!shippingInformationToBeDeleted) {
                return { error: 'Shipping information not found' };
            }
            await shippingInformationToBeDeleted.update({
                status: "delete"
            })

            return res.status(200).json({ message: 'Shipping Information removed sucessfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    //post shop
    createNewShop = async (req, res) => {
        try {
            const {buyerId} = req.params;
            const {name, phone, address, email, bankName, bankAccount} = req.body

            const user = await models.User.findOne({
                where:
                {
                    id: buyerId,
                }
            })

            if (!user) {
                return res.status(400).json({ message: 'User not  found' });
            }

            const existingShop = await models.Shop.findOne({
                where: {
                    ownerId: buyerId,
                    name, phone, address, email
                }
            })
            if (existingShop) {
                return res.status(400).json({ message: 'Duplicated shop' });
            }

            const newShop = await models.Shop.create({
                ownerId: buyerId,
                name, phone, address, email, bankName, bankAccount
            })
            if (!newShop) {
                return res.status(400).json({ message: 'Failed to create new shop' });
            }

            return res.status(200).json({ message: 'Shop created successfully', newShop });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports = new BuyerController();
