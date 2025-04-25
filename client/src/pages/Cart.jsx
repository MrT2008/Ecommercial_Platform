import Heading from "../components/header/heading";
import HeadingBar from "../components/header/main";
import Footer from "../components/footer/main";
import Button from "../components/shares/Button";

import { useState } from "react";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { 
            id: 1, 
            name: "LCD Monitor", 
            price: 650, 
            quantity: 1, 
            image: "https://sieuviet.vn/hm_content/uploads/anh-san-pham/linh-kien/man-hinh/dell/49922_u3419w__2_.jpg"
        },

        { 
            id: 2, 
            name: "H1 Gamepad", 
            price: 550, 
            quantity: 2,
            image: "https://th.bing.com/th/id/OIP.UuZW7V5dfCpSo_VoBzAMpgHaHa?rs=1&pid=ImgDetMain"
        },
    ]);

    const increaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="p-8">
            {/* Heading */}
            <div className="text-3xl font-bold mb-6">
                <p>Cart</p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 font-semibold py-4 border-b">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
                <div>Action</div>
            </div>

            {/* Product List */}
            <div className="space-y-6 my-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-5 gap-4 items-center border-b pb-4">
                        {/* Product Info */}
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                            <div className="font-bold">{item.name}</div>
                        </div>

                        {/* Price */}
                        <div>${item.price}</div>

                        {/* Quantity Control */}
                        <div className="flex items-center">
                            <button
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                -
                            </button>
                            <div className="px-4 py-1 border-t border-b">{item.quantity}</div>
                            <button
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                                onClick={() => increaseQuantity(item.id)}
                            >
                                +
                            </button>
                        </div>

                        {/* Subtotal */}
                        <div>${item.price * item.quantity}</div>

                        {/* Remove Button */}
                        <div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Remove item"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-10 border-t pt-6">
                <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>$0</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Coupon:</span>
                    <span>-$0</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total:</span>
                    <span>${subtotal}</span>
                </div>

                {/* Checkout Button */}
                <Button text="Proceed to checkout"> </Button>
            </div>
        </div>
    );
};

export default Cart;
