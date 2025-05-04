import React, { useEffect, useState } from "react";
import Sidebar from "../../components/account/accountSidebar";
import OutlineButton from "../../components/shares/OutlineButton";
import SecondaryButton from "../../components/shares/SecondaryButton";
import { viewCancelledOrders } from "../../api/buyerAPI";

const Cancellations = () => {
  const [orders, setOrders]     = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await viewCancelledOrders();
        setOrders(list);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách đơn đã hủy");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 container mx-auto py-10 px-8">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-4">
          Cancellations
        </h2>

        {orders.length === 0 ? (
          <p>No orders have canceled.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6 mb-6">
              {/* Header */}
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-6">
                <h3 className="text-lg font-medium">{order.shopName}</h3>
                <span className="text-red-500 font-semibold">{order.status}</span>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Type: {item.type}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold">
                  Total: <span className="text-red-500">${order.total}</span>
                </p>
                <div className="flex gap-4">
                  <OutlineButton
                    title="Contact Shop"
                    onClick={() => alert(`Contacting shop for order ${order.id}`)}
                  />
                  <SecondaryButton
                    title="Reorder"
                    onClick={() => alert(`Reordering order ${order.id}`)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cancellations;
