import { useState, useEffect } from "react";
import SecondaryButton from "../../components/shares/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { getCartById, removeFromCart, updateCart } from "../../api/buyerAPI";
import { useAuth } from "../../hooks/useAuth";

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const { user, loading } = useAuth();
    if (loading) return null; // or a loading spinner
    
    if (!user) {
        navigate('/login');
        return null;
    }
    const userId = user.id;
    // Fetch cart items from API
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await getCartById(userId);
                const cartItemsArray = Object.values(response.cart);
                setCartItems(cartItemsArray);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
    }, [userId]);


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
        setCartItems(prev => {
            const updatedCart = prev.map(item =>
                item.productId === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
    
            const targetItem = prev.find(item => item.productId === id);
            if (targetItem) {
                updateCart(userId, id, targetItem.quantity + 1);
            }
    
            return updatedCart;
        });
    };
    

    const decreaseQuantity = (id) => {
        setCartItems(prev => {
            const updatedCart = prev.map(item =>
                item.productId === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
    
            const targetItem = prev.find(item => item.productId === id);
            if (targetItem && targetItem.quantity > 1) {
                updateCart(userId, id, targetItem.quantity - 1);
            }
    
            return updatedCart;
        });
    };
    

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.productId !== id));
        setSelectedItems(prev => {
            const newSelectedItems = { ...prev };
            delete newSelectedItems[id];
            return newSelectedItems;
        });
        removeFromCart(userId, id);
    };

    const toggleSelectItem = (id) => {
        const newSelections = {
            ...selectedItems,
            [id]: !selectedItems[id],
        };
    
        // Compute updated shopSelections
        const newShopSelections = {};
        Object.keys(itemsByShop).forEach(shopId => {
            const shopItems = cartItems.filter(item => item.shopId === parseInt(shopId));
            newShopSelections[shopId] = shopItems.every(item => newSelections[item.productId]);
        });
    
        // Compute updated selectAll status
        const allSelected = cartItems.every(item => newSelections[item.productId]);
    
        setSelectedItems(newSelections);
        setShopSelections(newShopSelections);
        setSelectAll(allSelected);
    };
    

    const toggleSelectShop = (shopId) => {
        const shopItems = cartItems.filter(item => item.shopId === shopId);
        const allSelected = shopItems.every(item => selectedItems[item.productId]);
    
        const newSelections = { ...selectedItems };
        shopItems.forEach(item => {
            newSelections[item.productId] = !allSelected;
        });
    
        // Update all states in one go using the computed values
        const allItemsSelected = cartItems.every(item => newSelections[item.productId]);
    
        setSelectedItems(newSelections);
        setShopSelections(prev => ({
            ...prev,
            [shopId]: !allSelected
        }));
        setSelectAll(allItemsSelected);
    };
    

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        const newSelections = {};
        const newShopSelections = {};

        // Select or deselect all items
        cartItems.forEach(item => {
            newSelections[item.productId] = newSelectAll;
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
            newShopSelections[shopId] = shopItems.every(item => selectedItems[item.productId]);
        });

        setShopSelections(newShopSelections);
    };

    const updateSelectAllStatus = () => {
        const allSelected = cartItems.every(item => selectedItems[item.productId]);
        setSelectAll(allSelected);
    };

    const getSelectedSubtotal = () => {
        return cartItems
            .filter(item => selectedItems[item.productId])
            .reduce((acc, item) => acc + item.productSalePrice * item.quantity, 0);
    };
    
    // function to handle checkout
    const handleCheckout = () => {
        // const selectedCartItems = getSelectedItems();
        const selectedCartItems = cartItems.filter(item => selectedItems[item.productId]);

        if (selectedCartItems.length === 0) {
            alert("Please select at least one item to checkout.");
            return;
        }
        
        // Save selected items to localStorage for the checkout page
        localStorage.setItem('checkoutItems', JSON.stringify(selectedCartItems));
        
        // Navigate to checkout page
        navigate('/buyer/check-out');
    };
    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Heading */}
            <div className="text-3xl font-bold mb-6 text-[#FFA50B]">
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
                <div className="col-span-1 "></div>
                <div className="flex justify-center items-center">Price</div>
                <div className="flex justify-center items-center">Quantity</div>
                <div className="flex justify-center items-center">Subtotal</div>
                <div className="flex justify-center items-center">Action</div>
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
                            <div key={item.productId} className="grid grid-cols-6 gap-4 items-center border-b border-gray-300 py-4">
                                {/* Checkbox + Product Info */}
                                <div className="flex items-center gap-4 col-span-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems[item.productId] || false}
                                        onChange={() => toggleSelectItem(item.productId)}
                                        className="mx-2"
                                    />
                                    <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover" />
                                    <div>
                                        <div className="font-medium">{item.productName}</div>
                                        {item.variant && (
                                        <div className="text-sm text-gray-500">
                                            <span>{item.variantLabel} </span>
                                            <span>{item.variant}</span>
                                        </div>
                                        )}
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-center">${item.productSalePrice}</div>

                                {/* Quantity Control */}
                                <td className="flex items-center justify-center h-full">
                                    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-fit text-center">
                                        <button
                                            className=" px-3 py-2 flex items-center justify-center border-r border-gray-300 hover:bg-gray-100"
                                            onClick={() => decreaseQuantity(item.productId)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={String(item.quantity).padStart(2, '0')}
                                            readOnly
                                            className="w-12 text-center py-2 bg-white outline-none"
                                        />
                                        <button
                                            className="px-3 py-2 flex items-center justify-center border-l border-gray-300 hover:bg-gray-100"
                                            onClick={() => increaseQuantity(item.productId)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                {/* Subtotal */}
                                <div className="text-center">${item.productSalePrice * item.quantity}</div>

                                {/* Remove Button */}
                                <div className="flex justify-center text-center">
                                    <button
                                        onClick={() => removeItem(item.productId)}
                                        className="text-[#FF3838] hover:text-[#DF0000]"
                                        title="Remove item"
                                    >
                                        {/* <i className="fas fa-trash"></i> */}
                                        <FontAwesomeIcon icon={faTrash}  />
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
                <div className="flex justify-between font-bold text-lg text-[#FF3838] mt-4">
                    <span>Total:</span>
                    <span>${getSelectedSubtotal()}</span>
                </div>

                {/* Checkout Button */}
                <div className="flex justify-end mt-3">
                    <SecondaryButton title="Proceed to checkout" onClick={handleCheckout} />
                </div>
                {/* href="/user/check-out" */}
            </div>
        </div>
    );
};

export default Cart;