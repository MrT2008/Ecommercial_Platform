import Button from "../components/shares/Button";
import { useState } from "react";
// import SecondaryButton from "../shares/SecondaryButton";
import "@fortawesome/free-solid-svg-icons";
const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            shopId: 1,
            shopName: "Shop's name",
            name: "LCD Monitor",
            price: 650,
            quantity: 1,
            image: "https://sieuviet.vn/hm_content/uploads/anh-san-pham/linh-kien/man-hinh/dell/49922_u3419w__2_.jpg"
        },
        {
            id: 2,
            shopId: 1,
            shopName: "Shop's name",
            name: "H1 Gamepad",
            price: 550,
            quantity: 2,
            variant: "Red",
            variantLabel: "Phân loại hàng:",
            image: "https://th.bing.com/th/id/OIP.UuZW7V5dfCpSo_VoBzAMpgHaHa?rs=1&pid=ImgDetMain"
        },
        {
            id: 3,
            shopId: 2,
            shopName: "Shop's name",
            name: "LCD Monitor",
            price: 650,
            quantity: 1,
            image: "https://sieuviet.vn/hm_content/uploads/anh-san-pham/linh-kien/man-hinh/dell/49922_u3419w__2_.jpg"
        },
        {
            id: 4,
            shopId: 2,
            shopName: "Shop's name",
            name: "H1 Gamepad",
            price: 550,
            quantity: 2,
            variant: "Red",
            variantLabel: "Phân loại hàng:",
            image: "https://th.bing.com/th/id/OIP.UuZW7V5dfCpSo_VoBzAMpgHaHa?rs=1&pid=ImgDetMain"
        }
    ]);

    const [selectedItems, setSelectedItems] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [shopSelections, setShopSelections] = useState({});

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
        // Also remove from selected items
        const newSelectedItems = { ...selectedItems };
        delete newSelectedItems[id];
        setSelectedItems(newSelectedItems);
    };

    const toggleSelectItem = (id) => {
        setSelectedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));

        // Update shop selection status
        updateShopSelections();
        // Update select all status
        updateSelectAllStatus();
    };

    const toggleSelectShop = (shopId) => {
        const shopItems = cartItems.filter(item => item.shopId === shopId);
        const allSelected = shopItems.every(item => selectedItems[item.id]);
        
        // Create new selection state for this shop's items
        const newSelections = { ...selectedItems };
        shopItems.forEach(item => {
            newSelections[item.id] = !allSelected;
        });
        
        setSelectedItems(newSelections);
        setShopSelections(prev => ({
            ...prev,
            [shopId]: !allSelected
        }));
        
        // Check if all items are now selected to update the selectAll state
        updateSelectAllStatus();
    };

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        const newSelections = {};
        const newShopSelections = {};
        
        // Select or deselect all items
        cartItems.forEach(item => {
            newSelections[item.id] = newSelectAll;
        });
        
        // Update shop selections
        Object.keys(itemsByShop).forEach(shopId => {
            newShopSelections[shopId] = newSelectAll;
        });
        
        setSelectAll(newSelectAll);
        setSelectedItems(newSelections);
        setShopSelections(newShopSelections);
    };

    const updateShopSelections = () => {
        const newShopSelections = {};
        
        Object.keys(itemsByShop).forEach(shopId => {
            const shopItems = cartItems.filter(item => item.shopId === parseInt(shopId));
            newShopSelections[shopId] = shopItems.every(item => selectedItems[item.id]);
        });
        
        setShopSelections(newShopSelections);
    };

    const updateSelectAllStatus = () => {
        const allSelected = cartItems.every(item => selectedItems[item.id]);
        setSelectAll(allSelected);
    };

    const getSelectedSubtotal = () => {
        return cartItems
            .filter(item => selectedItems[item.id])
            .reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <div className="p-8">
            {/* Heading */}
            <div className="text-3xl font-bold mb-6">
                <p>Cart</p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 font-semibold py-4 border-b">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="mr-2"
                    />
                    <span>Product</span>
                </div>
                <div className="col-span-1"></div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
                <div>Action</div>
            </div>

            {/* Product List Grouped by Shop */}
            <div className="space-y-6 my-4">
                {Object.keys(itemsByShop).map((shopId) => (
                    <div key={shopId} className="mb-8">
                        {/* Shop Header */}
                        <div className="grid grid-cols-6 gap-4 items-center py-3 bg-gray-50">
                            <div className="flex items-center col-span-2">
                                <input
                                    type="checkbox"
                                    checked={shopSelections[shopId] || false}
                                    onChange={() => toggleSelectShop(parseInt(shopId))}
                                    className="mx-2"
                                />
                                <span className="font-medium">{itemsByShop[shopId].shopName}</span>
                            </div>
                            <div className="col-span-4"></div>
                        </div>

                        {/* Shop Items */}
                        {itemsByShop[shopId].items.map((item) => (
                            <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-b py-4">
                                {/* Checkbox */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems[item.id] || false}
                                        onChange={() => toggleSelectItem(item.id)}
                                        className="mx-2"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        {item.variant && (
                                            <div className="text-sm text-gray-500">
                                                <span>{item.variantLabel} </span>
                                                <span>{item.variant}</span>
                                            </div>
                                        )}
                                    </div>
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
                                    <div className="px-4 py-1 border-t border-b">
                                        {String(item.quantity).padStart(2, '0')}
                                    </div>
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
                                        {/* <i className="fas fa-trash"></i> */}
                                        delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-10 border-t pt-6">
                <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${getSelectedSubtotal()}</span>
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
                    <span>${getSelectedSubtotal()}</span>
                </div>

                {/* Checkout Button */}
                <Button text="Proceed to checkout" href="/user/check-out"/> 
            </div>
        </div>
    );
};

export default Cart;