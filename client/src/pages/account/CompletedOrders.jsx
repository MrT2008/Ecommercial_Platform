import React, { useState } from "react"; // Thêm useState vào đây
import Sidebar from "../../components/account/accountSidebar";
import OutlineButton from "../../components/shares/OutlineButton";
import SecondaryButton from "../../components/shares/SecondaryButton";
import ReviewDialog from "../../pages/account/ReviewDialog";

const CompletedOrders = () => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 1,
      shopName: "Shop's name",
      status: "PENDING PAYMENT",
      items: [
        {
          name: "LCD Monitor",
          type: "red",
          quantity: 1,
          price: 650,
          image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
        },
        {
          name: "LCD Monitor",
          type: "red",
          quantity: 1,
          price: 650,
          image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
        },
      ],
      total: 1000,
    },
    {
      id: 2,
      shopName: "Another Shop",
      status: "COMPLETED ORDER",
      items: [
        {
          name: "Gaming Mouse",
          type: "black",
          quantity: 2,
          price: 50,
          image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
        },
        {
            name: "Gaming Mouse",
            type: "black",
            quantity: 2,
            price: 50,
            image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
        },
        {
          name: "Mechanical Keyboard",
          type: "white",
          quantity: 1,
          price: 120,
          image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
        },
      ],
      total: 170,
    },
    {
      id: 3,
      shopName: "Completed Shop",
      status: "COMPLETED ORDER",
      items: [
        {
          name: "Headphones",
          type: "blue",
          quantity: 1,
          price: 100,
          image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
        },
      ],
      total: 100,
    },
  ];

  const handleReview = (order) => {
    setSelectedOrder(order);
    setIsReviewOpen(true);
  };

  const handleSaveReview = (reviews) => {
    console.log("Reviews saved:", reviews);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-10 px-8 ">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-4">Completed Orders</h2>
        {orders
          .filter((order) => order.status === "COMPLETED ORDER")
          .map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6 mb-6">
              {/* Header */}
              <div className="flex justify-between items-center rounded-lg shadow p-3 mb-6">
                <h2 className="text-lg font-bold">{order.shopName}</h2>
                <span className="text-red-500 font-semibold">{order.status}</span>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-gray-300 p-4"
                  >
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
              <div className="flex flex-col items-end pt-4 mt-4">
                {/* Total */}
                <p className="font-bold">
                  Total: <span className="text-red-500">${order.total}</span>
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                  <OutlineButton
                    title="Contact Shop"
                    onClick={() => alert(`Contacting shop for order ${order.id}`)}
                  />
                  <SecondaryButton
                    title="Review"
                    onClick={() => handleReview(order)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <ReviewDialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSave={handleSaveReview}
        order={selectedOrder}
      />
    </div>
  );
};

export default CompletedOrders;