
const { where, json, Op} = require('sequelize');
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
                    if (User.imageURL){
                        User.imageURL = User.imageURL.replace(/^.*[\\\/]public[\\\/]/, '/');
                        User.imageURL = `${req.protocol}://${req.get('host')}/${User.imageURL}`
                    }
        
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            const {fullName, email, phoneNumber, imageURL} = req.body

=======
            const {fullName, email} = req.body
            const imageURL = req.file ? req.file.path : null;
            console.log("imageURL", imageURL)
>>>>>>> Stashed changes
=======
            const {fullName, email} = req.body
            const imageURL = req.file ? req.file.path : null;
            console.log("imageURL", imageURL)
>>>>>>> Stashed changes
            const user = await models.User.findByPk(buyerId)
            if (!user) {
                return res.status(404).json({ error: 'User not found' }); 
            }

            await user.update({
                fullName: fullName,
                email: email,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                imageURL: imageURL
=======
                imageURL: imageURL,
>>>>>>> Stashed changes
=======
                imageURL: imageURL,
>>>>>>> Stashed changes
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

            let usePaymentMethod = inUsed
            const allreadyHasDefault = await models.PaymentMethod.findOne({
                where: {
                    userId: buyerId,
                    isDeleted: false
                }
            })
            if (!allreadyHasDefault) {
                usePaymentMethod = true
            }
            // console.log("usePyament aaaaaaaaaaaaa", usePaymentMethod)
            const existingPaymentMethod = await models.PaymentMethod.findOne({
                where: {
                    userId: buyerId,
                    bankName, bankAccountNumber
                }
            })
            if (existingPaymentMethod) {
                if (existingPaymentMethod.isDeleted) {
                    if (inUsed) {
                        const previousDefaultMethod = await models.PaymentMethod.findOne({
                            where: {
                                userId: buyerId,
                                inUsed: true,
                            }
                        })
                        if (previousDefaultMethod) {
                            await previousDefaultMethod.update({
                                inUsed: false
                            })
                        }
                    }
                    await existingPaymentMethod.update({
                        isDeleted: false,
                        inUsed: usePaymentMethod
                    })
                    return res.status(200).json({ message: 'Create payment method sucessfully', existingPaymentMethod});
                } else {
                    return res.status(400).json({ message: 'Duplicated payment method' });
                }
            }
            if (inUsed) {
                console.log("aaaaaaaaaaaaaaaaaaaa")
                const previousDefaultMethod = await models.PaymentMethod.findOne({
                    where: {
                        userId: buyerId,
                        inUsed: true,
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
                inUsed: usePaymentMethod
            })
            return res.status(200).json({ message: 'Create payment method sucessfully', newPaymentMethod});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    removePaymentMethod = async (req, res) =>{
        try {
            const {buyerId} = req.params;
            const {paymentId} = req.body;
            const paymentMethodToBeDeleted = await models.PaymentMethod.findByPk(paymentId)
            if (!paymentMethodToBeDeleted || paymentMethodToBeDeleted.isDeleted) {
                return res.status(400).json({ error: 'Payment method not found' });
            }
            if (paymentMethodToBeDeleted.inUsed) {
                const newDefaultPayment = await models.PaymentMethod.findOne({
                    where: {
                        userId: buyerId,
                        isDeleted: false,
                        inUsed: false
                    }
                })
                if (newDefaultPayment) {
                    await newDefaultPayment.update({
                        inUsed: true
                    })
                }
            }
            await paymentMethodToBeDeleted.update({
                isDeleted: true,
                inUsed: false
            })

            return res.status(200).json({ message: 'Payment method removed sucessfully', paymentMethodToBeDeleted });
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
    updateCart = async (req, res) => {
        try {
            const {buyerId} = req.params;
            const {productId, quantity} = req.body;

            const productInCart = await models.Cart.findOne({
                where: {
                    userId: buyerId,
                    productId: productId
                }
            })
            const quantityBeforeUpdate = productInCart.quantity

            if (!productInCart) {
                return res.status(404).json({ error: 'Product not found in cart' });
            }

            await productInCart.update({
                quantity: quantity
            })

            const productToBeUpdated = await models.Product.findByPk(productId)
            await productToBeUpdated.update({
                stock: productToBeUpdated.stock + quantityBeforeUpdate - quantity
            })
            return res.status(200).json({ message: 'Update cart sucessfully', productInCart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

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
            let cartNotEmpty = false
            let cart = {}
            let item_index = 0
            for (const item of cartItems) {
                if (!item.isDeleted) {
                    cartNotEmpty = true
                    const product = await models.Product.findByPk(item.productId)
                if (!product) {
                    return res.status(400).json({ error: 'Found no product with this id' });
                }
                const shop = await models.Shop.findByPk(product.shopId)
                if (!shop) {
                    return  res.status(400).json({ error: 'failed to find shop' });
                }
                const cartItem = {
                    shopName: shop.name,
                    shopId: shop.id,
                    userId: item.userId,
                    productId: item.productId,
                    productName: product.name,
                    productSalePrice: product.salePrice,
                    productImage: product.thumbnailURL,
                    productPrice: product.price,
                    quantity: item.quantity
                }
                cart[`product_${item_index}`] = cartItem
                item_index++
                }
            }
            const responseMessage = (!cartNotEmpty ? "No item in cart" : "Item in cart found successfully")
            return res.status(200).json({message: responseMessage , cart})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    proceedWithCheckout = async (req, res) => {
        const t = await models.Announcement.sequelize.transaction();
        try {
            const {buyerId} = req.params
            const {paymentMethod, productId} = req.body
            let payment = {}
            let transactionPaymentType = ""
            if (paymentMethod.toLowerCase() === "bank") {
                const userDefaultPayment = await models.PaymentMethod.findOne({
                    where: {
                        userId: buyerId,
                        inUsed: true,
                        isDeleted: false
                    }
                })
                if (!userDefaultPayment) {
                    await t.rollback();
                    return res.status(400).json({ message: 'No default payment method found' });
                }
                transactionPaymentType = "credit card"
                payment = {
                    type: transactionPaymentType,
                    bankName: userDefaultPayment.bankName,
                    bankAccountNumber: userDefaultPayment.bankAccountNumber,
                }
            } else if (paymentMethod.toLowerCase() === "cash") {
                transactionPaymentType = "cash"
                payment = {type: transactionPaymentType}
            } else {
                await t.rollback();
                return res.status(400).json({ message: 'Invalid payment method' });
            }
            const user_shipping_info = await models.ShipInfo.findOne({
                where: {
                    userId: buyerId,
                    status: "active"
                }
            })
            if (!user_shipping_info) {
                await t.rollback();
                return res.status(400).json({ error: 'No default shipping information found'});
            }
            console.log("abc")
            const cartItems = await models.Cart.findAll({
                where: {
                    userId: buyerId,
                    productId: productId,
                    isDeleted: false
                }
            })
            if (cartItems.length === 0) {
                await t.rollback();
                return res.status(404).json({ error: 'No product in cart to proceed' });
            }
            const orderJustCreated = await models.Order.create({
                buyerId: buyerId,
                totalPrice: 0
            })
            console.log("abcd")
            let priceTotal = 0
            let itemOrdered = {}
            let item_index = 0
            for (const cartItem of cartItems) {
                const productInCart = await models.Product.findByPk(cartItem.productId)
                if (!productInCart) {
                    await t.rollback();
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

                itemOrdered[`product_${item_index}`] = orderItem
                item_index++
            }
            await models.Cart.update(
                {
                    isDeleted: true
                }, {
                    where: {
                        userId: buyerId,
                        isDeleted: false
                    }
                }
            )
            await orderJustCreated.update({totalPrice: priceTotal })
            const newTransaction = await models.Transaction.create({
                orderId: orderJustCreated.id,
                paymentMethod: transactionPaymentType,
            })
            console.log("abcdef")

            await t.commit();
            return res.status(200).json({message: 'Successfully place order', 
                order: {
                    orderId: orderJustCreated.id,
                    buyerId: buyerId,
                    totalPrice: orderJustCreated.totalPrice,
                    paymentMethod: payment,
                    itemOrdered
                },
                shippingInformation: {
                    receiverName: user_shipping_info.receiverName,
                    address: user_shipping_info.address,
                    phone: user_shipping_info.phone
                },
                newTransaction
            })
        } catch (error) {
            await t.rollback();
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    viewAllOrderByStatus = async (req, res) => {
        try {
            const {buyerId} = req.params
            const ordersStatus = req.params.status
            const ordersList = await models.Order.findAll({
                where: {
                    buyerId: buyerId,
                    status: ordersStatus
                },
            })
            if (!ordersList) {
                return res.status(404).json({ error: 'No orders found' });
            }
            
            const orderList = []
            for (const ordersItem of ordersList) {
                const ordersDetail = await models.OrderDetail.findAll({where: {orderId: ordersItem.id}})
                const productList = []
                for (const order of ordersDetail) {
                    const product = await models.Product.findByPk(order.productId)
                    const shop = await models.Shop.findOne({ where: {id: order.shopId}})
                    if (!product) {
                        return res.status(404).json({ error: 'Not found product in orders'});
                    }
                    productList.push({
                        ...product.toJSON(),
                        quantity: order.quantity,
                        shopName: shop.name,
                    })
                }
                orderList.push({
                    orderId: ordersItem.id,
                    orderStatus: ordersItem.status,
                    productList: productList,
                    totalPrice: ordersItem.priceAtPurchase
                })
            }
            return res.status(200).json({message: 'Successfully retrieve orders list', orderList})
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    addShippingInfo = async (req, res) => {
        try {
            const {buyerId} = req.params
            const {receiverName, address, phone, status} = req.body
            let inUsed = status

            const existingInfo  = await models.ShipInfo.findOne({
                where: {
                    userId: buyerId,
                    receiverName: receiverName,
                    address: address,
                    phone: phone
                }
            })
            const isNotTheOnlyOne = await models.ShipInfo.findOne({
                where: {
                    userId: buyerId,
                    status: { [Op.ne]: "delete" }
                }
            })
            if (!isNotTheOnlyOne) {
                inUsed = "active"
            }

            if (existingInfo) {
                if (existingInfo.status === 'delete') {
                    console.log("a", inUsed)
                    await existingInfo.update({
                        status: inUsed
                    })
                    return res.status(200).json({message: "Shipping information successfully created"})
                } else {
                    return res.status(404).json({ error: 'Duplicate shipping information', existingInfo});
                }
            }

            const newShipInfor = await models.ShipInfo.create({
                userId: buyerId,
                receiverName: receiverName,
                address: address,
                phone: phone,
                status: inUsed
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
                    status: { [Op.ne]: "delete" }
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
            console.log(shippingInformationToBeDeleted.status.toLowerCase())
            if (shippingInformationToBeDeleted.status.toLowerCase() === "active") {
                const newDefaultShippingInformation = await models.ShipInfo.findOne({
                    where: {
                        userId: buyerId,
                        status: { [Op.ne]: "delete" }
                    }
                })

                if (newDefaultShippingInformation) {
                    await newDefaultShippingInformation.update({
                        status: "active"
                    })
                }
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
