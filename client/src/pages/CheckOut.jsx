import Heading from "../components/header/heading";
import HeadingBar from "../components/header/main";
import Footer from "../components/footer/main";
import Button from "../components/shares/Button";

import { useState } from 'react';

const CheckOut = () => {
    const [cartItems, setCartItems] = useState([
        { 
            id: 1, 
            name: "LCD Monitor", 
            price: 650, 
            quantity: 1, 
            type: "red",
            image: "https://sieuviet.vn/hm_content/uploads/anh-san-pham/linh-kien/man-hinh/dell/49922_u3419w__2_.jpg"
        },
        { 
            id: 2, 
            name: "H1 Gamepad", 
            price: 550, 
            quantity: 2,
            type: "red",
            image: "https://th.bing.com/th/id/OIP.UuZW7V5dfCpSo_VoBzAMpgHaHa?rs=1&pid=ImgDetMain"
        },
    ]);

    const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div>

                {/* Shipping Address */}
                <div className="p-6 border m-8 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <span className="text-2xl mr-2">📍</span>
                        <input 
                            type="text" 
                            defaultValue="Nguyen Kieu Phuong" 
                            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg flex-1 mr-2" 
                        />
                        <div className="ml-auto">
                            <button title="Edit">
                                ✏️
                            </button>
                        </div>
                    </div>
                    <div className="ml-8">
                        <input 
                            type="text" 
                            defaultValue="(+84) 987 776 668" 
                            className="border-b border-gray-300 focus:outline-none focus:border- " 
                        />
                        <input 
                            type="text" 
                            defaultValue="Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP. Hồ Chí Minh" 
                            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full" 
                        />
                        <div className="flex justify-end mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="m-8 bg-white rounded-lg shadow-sm">
                    <div className="p-4 font-semibold border-b">
                        Shop's name
                    </div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center p-4 border-b">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                            <div className="flex-1">
                                <div className="font-bold">{item.name}</div>
                                <div className="text-gray-500 text-sm">Type: {item.type}</div>
                            </div>
                            <div className="w-24 text-right">${item.price}</div>
                            <div className="w-16 text-center">{item.quantity}</div>
                            <div className="w-24 text-right font-bold">
                                ${item.price * item.quantity}
                            </div>
                        </div>
                    ))}
                </div>

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
                                        checked={paymentMethod === 'Bank'}
                                        onChange={() => setPaymentMethod('Bank')}
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
                                        checked={paymentMethod === 'Cash on delivery'}
                                        onChange={() => setPaymentMethod('Cash on delivery')}
                                    />
                                    <span className="ml-2">Cash on delivery</span>
                                </label>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="pt-4">
                            <Button text="Place Order" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckOut;
