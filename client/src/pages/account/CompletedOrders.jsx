import { useState, useEffect } from "react";
import Sidebar from "../../components/account/accountSidebar";
import OutlineButton from "../../components/shares/OutlineButton";
import SecondaryButton from "../../components/shares/SecondaryButton";
import ReviewDialog from "../../pages/account/ReviewDialog";
import { useAuth } from "../../hooks/useAuth";
import { getAllOrdersByStatus } from "../../api/buyerAPI";

const CompletedOrders = () => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersByStatus(user.id, "completed");
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

  // Calculate order total from product list considering price and quantity
  const calculateTotal = (products) => {
    if (!products || products.length === 0) return "0.00";

    return products.reduce((sum, product) => {
      // Check if price is a string and convert to number if needed
      const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
      const salePrice = product.salePrice && parseFloat(product.salePrice) > 0 ?
        (typeof product.salePrice === 'string' ? parseFloat(product.salePrice) : product.salePrice) :
        price;

      return sum + (salePrice * product.quantity);
    }, 0).toFixed(2);
  };

  // Get the effective price (sale price if available, otherwise regular price)
  const getEffectivePrice = (product) => {
    const regularPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    const salePrice = product.salePrice && parseFloat(product.salePrice) > 0 ?
      (typeof product.salePrice === 'string' ? parseFloat(product.salePrice) : product.salePrice) :
      null;

    return salePrice || regularPrice;
  };

  // Get the shop name from the first product in the list
  const getShopName = (products) => {
    if (!products || products.length === 0) return "Unknown Shop";
    return products[0].shopName || "Unknown Shop";
  };

  const handleReview = (order) => {
    setSelectedOrder(order);
    setIsReviewOpen(true);
  };

  const handleSaveReview = (reviews) => {
    console.log("Reviews saved:", reviews);
    setIsReviewOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 container mx-auto py-10 px-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">
          Completed Orders
        </h2>
        {orders.length === 0 ? (
          <p>There are currently no completed orders.</p>
        ) : (
          orders.map((order) => {
            // Calculate total for this order
            const orderTotal = calculateTotal(order.productList);
            const shopName = getShopName(order.productList);

            return (
              <div key={order.orderId} className="bg-white rounded-lg shadow p-6 mb-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-6">
                  <h3 className="text-lg font-medium">{shopName}</h3>
                  <span className="text-blue-500 font-semibold">{order.orderStatus}</span>
                </div>

                {/* Items */}
                {order.productList.length === 0 ? (
                  <p className="text-gray-500 italic py-4">No products in this order</p>
                ) : (
                  <div className="space-y-4">
                    {order.productList.map((item) => {
                      const effectivePrice = getEffectivePrice(item);
                      const itemTotal = (effectivePrice * item.quantity).toFixed(2);

                      return (
                        <div key={item.id} className="flex items-center justify-between border-b p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.thumbnailURL || "/api/placeholder/60/60"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${effectivePrice} × {item.quantity}</p>
                            <p className="text-sm text-gray-700">${itemTotal}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Footer with calculated total */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div>
                    <p className="font-bold text-lg">
                      Total: <span className="text-red-500">${orderTotal}</span>
                    </p>
                    {/* <p className="text-xs text-gray-500">Total includes all items in this order</p> */}
                  </div>
                  <div className="flex gap-4"><OutlineButton
                    title="Contact Shop"
                    onClick={() => alert(`Contacting shop for order ${order.orderId}`)}
                  />
                    <SecondaryButton
                      title="Review"
                      onClick={() => handleReview(order)}
                    /></div>

                  {/* Review Dialog */}
                  <ReviewDialog
                    isOpen={isReviewOpen}
                    onClose={() => setIsReviewOpen(false)}
                    onSave={handleSaveReview}
                    order={selectedOrder}
                  />
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default CompletedOrders;
