import { useEffect, useState } from "react";
import { getAllOrdersByStatus } from "../../api/buyerAPI";
import Sidebar from "../../components/account/accountSidebar";
import OutlineButton from "../../components/shares/OutlineButton";
import SecondaryButton from "../../components/shares/SecondaryButton";
import { useAuth } from "../../hooks/useAuth";

const PendingPayment = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  // Store shipping info for each orderId
  const [shippingInfos, setShippingInfos] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersByStatus(user.id, "pending");
        const ordersData = response.orderList;
        console.log("Orders data:", ordersData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (!loading && user) {
      fetchOrders();
    }
  }, [user, loading]);

  // Fetch shipping info for each order after orders are loaded
  useEffect(() => {
    const fetchShippingInfoForOrders = async () => {
      const newShippingInfos = {};
      await Promise.all(
        orders.map(async (order) => {
          try {
            // If order has shippingInfoId, fetch it
            if (order.shippingInfoId) {
              const res = await fetch(
                `http://localhost:8080/buyer/shippingInfo/${order.shippingInfoId}`
              );
              if (res.ok) {
                const data = await res.json();
                newShippingInfos[order.orderId] = data;
              }
            }
          } catch (err) {
            // Ignore error, just don't show shipping info
          }
        })
      );
      setShippingInfos(newShippingInfos);
    };

    if (orders.length > 0) {
      fetchShippingInfoForOrders();
    }
  }, [orders]);

  // Calculate order total from product list considering price and quantity
  const calculateTotal = (products) => {
    if (!products || products.length === 0) return "0.00";

    return products
      .reduce((sum, product) => {
        // Check if price is a string and convert to number if needed
        const price = typeof product.price === "string" ? parseFloat(product.price) : product.price;
        const salePrice =
          product.salePrice && parseFloat(product.salePrice) > 0
            ? typeof product.salePrice === "string"
              ? parseFloat(product.salePrice)
              : product.salePrice
            : price;

        return sum + salePrice * product.quantity;
      }, 0)
      .toFixed(2);
  };

  // Get the effective price (sale price if available, otherwise regular price)
  const getEffectivePrice = (product) => {
    const regularPrice =
      typeof product.price === "string" ? parseFloat(product.price) : product.price;
    const salePrice =
      product.salePrice && parseFloat(product.salePrice) > 0
        ? typeof product.salePrice === "string"
          ? parseFloat(product.salePrice)
          : product.salePrice
        : null;

    return salePrice || regularPrice;
  };

  // Group items by shop for a given product list
  const groupItemsByShop = (productList) => {
    return productList.reduce((acc, item) => {
      if (!acc[item.shopId]) {
        acc[item.shopId] = {
          shopName: item.shopName,
          items: [],
        };
      }
      acc[item.shopId].items.push(item);
      return acc;
    }, {});
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-10 px-8 ">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-4">Pending Payment</h2>
        {orders.length === 0 ? (
          <p>There are currently no ongoing orders.</p>
        ) : (
          orders.map((order) => {
            const orderTotal = calculateTotal(order.productList);
            const shippingInfo = shippingInfos[order.orderId];
            const itemsByShop = groupItemsByShop(order.productList);

            return (
              <div key={order.orderId} className="bg-white rounded-lg shadow p-6 mb-6">
                {/* Order Status Header */}
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-6">
                  <h3 className="text-lg font-medium">Order #{order.orderId}</h3>
                  <span className="text-blue-500 font-semibold">{order.orderStatus}</span>
                </div>
                {/* Shipping Info */}
                {shippingInfo && (
                  <div className="mb-4 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Recipient:</span> {shippingInfo.receiverName}
                    </div>
                    <div>
                      <span className="font-semibold">Phone:</span> {shippingInfo.phone}
                    </div>
                    <div>
                      <span className="font-semibold">Address:</span> {shippingInfo.address}
                    </div>
                  </div>
                )}
                {/* Items grouped by shop */}
                {Object.keys(itemsByShop).map((shopId) => (
                  <div key={shopId} className="mb-8">
                    {/* Shop Header */}
                    <div className="p-4 font-semibold border-b bg-gray-50">
                      {itemsByShop[shopId].shopName}
                    </div>
                    {/* Shop Items */}
                    <div className="divide-y">
                      {itemsByShop[shopId].items.map((item) => {
                        const effectivePrice = getEffectivePrice(item);
                        const itemTotal = (effectivePrice * item.quantity).toFixed(2);
                        return (
                          <div key={item.id} className="flex items-center p-4">
                            <div className="w-16">
                              <img
                                src={item.thumbnailURL || "/api/placeholder/60/60"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                            </div>
                            <div className="w-32 text-gray-600">Quantity: {item.quantity}</div>
                            <div className="w-20 text-right">${effectivePrice}</div>
                            <div className="w-24 text-right font-medium">${itemTotal}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {/* Footer with calculated total */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div>
                    <p className="font-bold text-lg">
                      Total: <span className="text-red-500">${orderTotal}</span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {/* <OutlineButton
                      title="Cancel"
                      onClick={() => alert(`Order ${order.orderId} canceled`)}
                    /> */}
                    <SecondaryButton
                      title="Contact Shop"
                      onClick={() => alert(`Contacting shop for order ${order.orderId}`)}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PendingPayment;
