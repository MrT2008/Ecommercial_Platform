import Sidebar from '../../components/seller/sellerSidebar';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import UpdateStatusDialog from '../seller/UpdateStatusDialog';
import { getSellerId } from "../../api/sellerAPI";
const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusStyles = {
    Completed: 'bg-green-100 text-green-600',
    Cancelled: 'bg-red-100 text-red-600',
    Processing: 'bg-yellow-100 text-yellow-600',
    Pending: 'bg-blue-100 text-blue-600',
  };

  const filterOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const filterButtons = [
    { label: 'All Orders', value: 'all', className: 'bg-gray-300 text-black' },
    { label: 'Pending', value: 'pending', className: 'bg-blue-100 text-blue-600' },
    { label: 'Processing', value: 'processing', className: 'bg-yellow-100 text-yellow-600' },
    { label: 'Completed', value: 'completed', className: 'bg-green-100 text-green-600' },
    { label: 'Cancelled', value: 'cancelled', className: 'bg-red-100 text-red-600' },
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shopId, setShopId] = useState(null);

  useEffect(() => {
    console.log('Selected status:', selectedStatus);
    console.log('Filtered orders:', selectedStatus === 'all'
      ? orders.map(o => ({ id: o.id, status: o.status }))
      : orders.filter(o => o.status === selectedStatus).map(o => ({ id: o.id, status: o.status }))
    );
  }, [selectedStatus, orders]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = getSellerId();
        const shopRes = await fetch(`http://localhost:8080/seller/getShop/${userId}`);
        const shopData = await shopRes.json();
        const shopId = shopData.data.shop.id;
        setShopId(shopId);

        const res = await fetch(`http://localhost:8080/seller/${shopId}/getOrders`);
        const data = await res.json();
        const ordersData = data.allOrders;
        const productsData = data.allProducts;

        const productMap = {};
        for (const product of productsData) {
          if (!productMap[product.orderId]) {
            productMap[product.orderId] = [];
          }
          productMap[product.orderId].push(product);
        }

        setOrders(ordersData);
        setProductsMap(productMap);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, [shopId]);


  const fetchOrders = async () => {
    const res = await fetch(`http://localhost:8080/seller/${shopId}/getOrders`);
    const data = await res.json();
    setOrders(data.allOrders);
  };

  useEffect(() => {
    fetchOrders(); // Tải danh sách khi component được mount
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-4/5 p-6 py-12 px-8">
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">All Orders</h2>
          <div className="flex gap-6">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                className={`px-5 py-2 rounded-full font-medium shadow ${selectedStatus === btn.value ? btn.className : 'bg-gray-100 text-gray-600'
                  }`}
                onClick={() => setSelectedStatus(btn.value)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-center text-gray-600 border-b">
              <th className="p-2">No.</th>
              <th className="p-2">Products</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Date</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {filterOrders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              filterOrders.map((order, index) => {
                const products = productsMap[order.id] || [];

                return (
                  <tr
                    key={order.id}
                    className={`text-center ${index % 2 === 0 ? 'bg-[#F7F6FF]' : 'bg-white'}`}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2 flex items-center justify-center gap-2">
                      {products.length > 0 && (
                        <img
                          src={products[0].thumbnailURL}
                          alt="product"
                          className="rounded-full w-8 h-8"
                        />
                      )}
                      <span>{products.map(p => p.name).join(', ')}</span>
                    </td>
                    <td className="p-2">{products.length}</td>
                    <td className="p-2">{order.buyerName}</td>
                    <td className="p-2">{order.transaction?.paymentMethod}</td>
                    <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-2">{parseFloat(order.totalPrice).toLocaleString()}₫</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${statusStyles[order.status] || 'bg-gray-200 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        className="text-[#5F33E1]"
                        title="Update"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsDialogOpen(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {isDialogOpen && (
        // <UpdateStatusDialog
        //   currentStatus={selectedOrder?.status}
        //   onClose={() => setIsDialogOpen(false)}
        //   onSave={(newStatus) => {
        //     // Cập nhật đơn hàng ở đây nếu cần gửi API
        //     console.log('Save new status:', newStatus);
        //     setIsDialogOpen(false);
        //   }}
        // />

        <UpdateStatusDialog
          currentStatus={selectedOrder?.status}
          shopId={shopId}                          // ← thêm shopId từ state
          orderId={selectedOrder?.id}              // ← thêm orderId từ đơn hàng được chọn
          onClose={() => setIsDialogOpen(false)}
          onSave={(newStatus) => {
            console.log('Save new status:', newStatus);
            setIsDialogOpen(false);
            // Có thể gọi lại fetchOrders() để load lại danh sách
            fetchOrders();
          }}
        // onSave={updateOrderStatus} 
        />
      )}
    </div>
  );
};

export default AllOrder;