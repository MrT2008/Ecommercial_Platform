import React, { useEffect, useState } from "react";
import Sidebar from "../../components/account/accountSidebar";
import OutlineButton from "../../components/shares/OutlineButton";
import SecondaryButton from "../../components/shares/SecondaryButton";
import { useState, useEffect } from "react";
import { getAllOrdersByStatus } from "../../api/buyerAPI";
import { useAuth } from "../../hooks/useAuth";

const PendingPayment = () => {
  // const orders = [
  //   {
  //     id: 1,
  //     shopName: "Shop's name",
  //     status: "PENDING PAYMENT",
  //     items: [
  //       {
  //         name: "LCD Monitor",
  //         type: "red",
  //         quantity: 1,
  //         price: 650,
  //         image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
  //       },
  //       {
  //         name: "LCD Monitor",
  //         type: "red",
  //         quantity: 1,
  //         price: 650,
  //         image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
  //       },
  //     ],
  //     total: 1000,
  //   },
  //   {
  //     id: 2,
  //     shopName: "Another Shop",
  //     status: "PENDING PAYMENT",
  //     items: [
  //       {
  //         name: "Gaming Mouse",
  //         type: "black",
  //         quantity: 2,
  //         price: 50,
  //         image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
  //       },
  //       {
  //         name: "Mechanical Keyboard",
  //         type: "white",
  //         quantity: 1,
  //         price: 120,
  //         image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
  //       },
  //     ],
  //     total: 170,
  //   },
  //   {
  //     id: 3,
  //     shopName: "Completed Shop",
  //     status: "COMPLETED ORDER",
  //     items: [
  //       {
  //         name: "Headphones",
  //         type: "blue",
  //         quantity: 1,
  //         price: 100,
  //         image: "https://mtv.vn/uploads/2023/02/25/meo-gg.jpg", // Placeholder image
  //       },
  //     ],
  //     total: 100,
  //   },
  // ];

  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  
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

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-10 px-8 ">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-4">Pending Payment</h2>
        {orders
          .filter((order) => order.orderStatus === "pending")
          .map((order) => (
            <div key={order.orderId} className="bg-white rounded-lg shadow p-6 mb-6">
              {/* Header */}
              <div className="flex justify-between items-center rounded-lg shadow p-3 mb-6">
                <h2 className="text-lg font-bold">{order.shopName}</h2>
                <span className="text-red-500 font-semibold">{order.status}</span>
              </div>

              {/* Items */}
              <div className="space-y-4">
              {order.productList.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-gray-300 p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.thumbnailURL}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${parseFloat(product.price).toLocaleString()}
                  </p>
                </div>
              ))}

              </div>

              {/* Footer */}
              <div className="flex flex-col items-end pt-4 mt-4">
                {/* Total */}
                <p className="font-bold">
                  Total:{" "}
                  <span className="text-red-500">
                    ${order.productList.reduce((sum, p) => sum + parseFloat(p.price) * p.quantity, 0)}
                  </span>
                </p>


                {/* Buttons */}
                <div className="flex gap-4">
                  <OutlineButton
                    title="Cancel"
                    onClick={() => alert(`Order ${order.id} canceled`)}
                  />
                  <SecondaryButton
                    title="Contact Shop"
                    onClick={() => alert(`Contacting shop for order ${order.id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PendingPayment;
