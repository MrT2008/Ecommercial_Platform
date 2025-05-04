import SecondaryButton from "../../components/shares/SecondaryButton";
import { useState, useEffect, use } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getShippingInfo, proceedWithCheckout, getCartById } from "../../api/buyerAPI";
import { useAuth } from "../../hooks/useAuth";
import ShippingAddress from "../../components/buyer/ShippingAddress";
const CheckOut = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
    const [loading, setLoading] = useState(true);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [shippingInfoDefault, setShippingInfoDefault] = useState({});
    const { user } = useAuth()
    const location = useLocation();
    const buyerID = user.id;

    

    // Load checkout items from localStorage when component mounts
    useEffect(() => {
        const loadCheckoutItems = () => {
            try {
                const savedItems = localStorage.getItem('checkoutItems');
                if (savedItems) {
                    const parsedItems = JSON.parse(savedItems);
                    setCartItems(parsedItems);
                } else {
                    // If no items in checkout, redirect back to cart
                    navigate('/buyer/cart');
                }
                return () => {
                    // Cleanup function to clear localStorage if needed
                    localStorage.removeItem('checkoutItems');
                }
            } catch (error) {
                console.error("Error loading checkout items:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCheckoutItems();
    }, [navigate]);


    useEffect(() => {
        const fetchShippingInfo = async () => {
            try {
                const response = await getShippingInfo(buyerID);
                setShippingInfo(response.userShippingInfo);
                // find the default shipping info by checking the status is active 
                const defaultShippingInfo = response.userShippingInfo.find(info => info.status === 'active');
                if (defaultShippingInfo) {
                    setShippingInfoDefault(defaultShippingInfo);
                }
            } catch (error) {
                console.error("Error fetching shipping information:", error);
            }
        };
        fetchShippingInfo();
    }, []);

    // const [cartItems, setCartItems] = useState([
    //     {
    //         id: 1,
    //         shopId: 1,
    //         shopName: "Shop's name",
    //         name: "LCD Monitor",
    //         price: 650,
    //         quantity: 1,
    //         type: "red",
    //         image: "https://th.bing.com/th/id/OIP.UuZW7V5dfCpSo_VoBzAMpgHaHa?rs=1&pid=ImgDetMain"
    //     },
    //     {
    //         id: 2,
    //         shopId: 1,
    //         shopName: "Shop's name",
    //         name: "LCD Monitor",
    //         price: 650,
    //         quantity: 1,
    //         type: "red",
    //         image: "https://th.bing.com/th/id/OIP.UuZW7V5dfCpSo_VoBzAMpgHaHa?rs=1&pid=ImgDetMain"
    //     },
    //     {
    //         id: 3,
    //         shopId: 2,
    //         shopName: "Another Shop",
    //         name: "H1 Gamepad",
    //         price: 550,
    //         quantity: 2,
    //         type: "red",
    //         image: "https://th.bing.com/th/id/OIP.UuZW7V5dfCpSo_VoBzAMpgHaHa?rs=1&pid=ImgDetMain"
    //     },
    // ]);


    // Group items by shop

    const itemsByShop = cartItems.reduce((acc, item) => {
        if (!acc[item.shopId]) {
            acc[item.shopId] = {
                shopName: item.shopName,
                items: []
            };
        }
        acc[item.shopId].items.push(item);
        return acc;
    }, {});

    const subtotal = cartItems.reduce((acc, item) => acc + item.productSalePrice * item.quantity, 0);

    const handlePlaceOrder = async () => {
        try {
            for (const item of cartItems) {
                console.log("Proceeding with checkout for item:", item.productId);
                await proceedWithCheckout(buyerID, paymentMethod, item.productId);
            }
    
            // Clear checkout items from localStorage
            localStorage.removeItem('checkoutItems');
    
            // Optionally redirect to order confirmation page
            navigate('/account/pending');
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("An error occurred while placing the order. Please try again.");
        }
    };
    

    if (loading) {
        return <div className="p-8 text-center">Loading checkout information...</div>;
    }

    if (cartItems.length === 0) {
        return <div className="p-8 text-center">No items selected for checkout.</div>;
    }

    if (!shippingInfoDefault) {
        return <div className="p-8 text-center">No shipping information available.</div>;
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div>

                {/* Shipping Address */}
                <ShippingAddress
                    recipientName={shippingInfoDefault.receiverName}
                    phoneNumber={shippingInfoDefault.phone}
                    deliveryAddress={shippingInfoDefault.address}
                />
                {/* Cart Items - Grouped by Shop */}
                {Object.values(itemsByShop).map((shop, shopIndex) => (
                    <div key={shopIndex} className="m-8 bg-white rounded-lg shadow-sm">
                        <div className="p-4 font-semibold border-b">
                            {shop.shopName}
                        </div>
                        <div className="divide-y">
                            {shop.items.map((item) => (
                                <div key={item.id} className="flex items-center p-4">
                                    <div className="w-16">
                                        <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{item.productName}</div>
                                    </div>
                                    <div className="w-32 text-gray-600">
                                        Type: {item.type}
                                    </div>
                                    <div className="w-20 text-right">
                                        ${item.productSalePrice}
                                    </div>
                                    <div className="w-10 text-center">
                                        {item.quantity}
                                    </div>
                                    <div className="w-24 text-right font-medium">
                                        ${item.productSalePrice * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Summary */}
                <div className="m-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal :</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>$0</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Coupon:</span>
                            <span>-$0</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>${subtotal}</span>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-2">
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={() => setPaymentMethod("bank")}
                                    />
                                    <span className="ml-2">Bank</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Cash on delivery"
                                        checked={paymentMethod === 'cash'}
                                        onChange={() => setPaymentMethod("cash")}
                                    />
                                    <span className="ml-2">Cash on delivery</span>
                                </label>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="pt-4">
                            <SecondaryButton title="Place Order" align="left" onClick={handlePlaceOrder} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckOut;
