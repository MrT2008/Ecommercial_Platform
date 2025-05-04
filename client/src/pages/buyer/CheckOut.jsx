import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { proceedWithCheckout } from "../../api/buyerAPI";
import ShippingAddress from "../../components/buyer/ShippingAddress";
import SecondaryButton from "../../components/shares/SecondaryButton";
import { useAuth } from "../../hooks/useAuth";
const CheckOut = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  // Default payment method is "cash" (Cash on delivery)
  const [paymentMethod] = useState("cash");
  const [loading, setLoading] = useState(true);
  // Set initial value to null for proper loading check
  const [shippingInfoDefault, setShippingInfoDefault] = useState(null);
  const { user } = useAuth();
  const location = useLocation();
  const buyerID = user.id;

  // Load checkout items from localStorage when component mounts
  useEffect(() => {
    const loadCheckoutItems = () => {
      try {
        const savedItems = localStorage.getItem("checkoutItems");
        if (savedItems) {
          const parsedItems = JSON.parse(savedItems);
          setCartItems(parsedItems);
        } else {
          // If no items in checkout, redirect back to cart
          navigate("/buyer/cart");
        }
        return () => {
          // Cleanup function to clear localStorage if needed
          localStorage.removeItem("checkoutItems");
        };
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
        const response = await fetch(`http://localhost:8080/buyer/${buyerID}/shippingInfo`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        // Find the default shipping info (status === 'active')
        if (data.userShippingInfo && data.userShippingInfo.length > 0) {
          const defaultInfo = data.userShippingInfo.find((info) => info.status === "active");
          setShippingInfoDefault(defaultInfo || data.userShippingInfo[0]);
        } else {
          setShippingInfoDefault(null);
        }
      } catch (error) {
        console.error("Error fetching shipping info:", error);
        setShippingInfoDefault(null);
      }
    };

    if (buyerID) {
      fetchShippingInfo();
    }
  }, [buyerID]);

  // Group items by shop

  const itemsByShop = cartItems.reduce((acc, item) => {
    if (!acc[item.shopId]) {
      acc[item.shopId] = {
        shopName: item.shopName,
        items: [],
      };
    }
    acc[item.shopId].items.push(item);
    return acc;
  }, {});

  const subtotal = cartItems.reduce((acc, item) => acc + item.productSalePrice * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      // Collect all product IDs from cartItems
      const productIds = cartItems.map((item) => item.productId);
      console.log("Proceeding with checkout for items:", productIds);
      await proceedWithCheckout(buyerID, paymentMethod, productIds);

      // Clear checkout items from localStorage
      localStorage.removeItem("checkoutItems");

      // Optionally redirect to order confirmation page
      navigate("/account/pending");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  if (loading || shippingInfoDefault === null) {
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
        <ShippingAddress
          recipientName={shippingInfoDefault.receiverName}
          phoneNumber={shippingInfoDefault.phone}
          deliveryAddress={shippingInfoDefault.address}
        />
        {Object.values(itemsByShop).map((shop, shopIndex) => (
          <div key={shopIndex} className="m-8 bg-white rounded-lg shadow-sm">
            <div className="p-4 font-semibold border-b">{shop.shopName}</div>
            <div className="divide-y">
              {shop.items.map((item) => (
                <div key={item.productId} className="flex items-center p-4">
                  <div className="w-16">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.productName}</div>
                  </div>
                  <div className="w-32 text-gray-600">Type: {item.type}</div>
                  <div className="w-20 text-right">${item.productSalePrice}</div>
                  <div className="w-10 text-center">{item.quantity}</div>
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
