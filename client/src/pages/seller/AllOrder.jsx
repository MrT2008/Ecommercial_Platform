import Sidebar from '../../components/admin/sellerSidebar';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import UpdateStatusDialog from '../seller/UpdateStatusDialog'; 

const AllOrder = () => {
  const [orders] = useState([
    {
      id: 1,
      products: ['Hat'],
      quantity: 1,
      customer: 'Matt Dickerson',
      payment: 'Bank',
      date: '13/05/2022',
      total: 4.95,
      status: 'Delivered',
    },
    {
      id: 2,
      products: ['Hat', 'Hat', 'Hat'],
      quantity: 1,
      customer: 'Matt Dickerson',
      payment: 'COD',
      date: '13/05/2022',
      total: 4.95,
      status: 'Canceled',
    },
    {
      id: 3,
      products: ['Hat'],
      quantity: 2,
      customer: 'Matt Dickerson',
      payment: 'Bank',
      date: '13/05/2022',
      total: 4.95,
      status: 'Processing',
    },
    {
      id: 4,
      products: ['Hat'],
      quantity: 1,
      customer: 'Matt Dickerson',
      payment: 'COD',
      date: '13/05/2022',
      total: 4.95,
      status: 'Pending',
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('All');

  const statusStyles = {
    Delivered: 'bg-green-100 text-green-600',
    Canceled: 'bg-red-100 text-red-600',
    Processing: 'bg-yellow-100 text-yellow-600',
    Pending: 'bg-blue-100 text-blue-600',
  };

  const filterOrders = selectedStatus === 'All'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const filterButtons = [
    { label: 'All Orders', value: 'All', className: 'bg-gray-300 text-black' },
    { label: 'Pending', value: 'Pending', className: 'bg-blue-100 text-blue-600' },
    { label: 'Processing', value: 'Processing', className: 'bg-yellow-100 text-yellow-600' },
    { label: 'Canceled', value: 'Canceled', className: 'bg-red-100 text-red-600' },
    { label: 'Delivered', value: 'Delivered', className: 'bg-green-100 text-green-600' },
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-4/5 p-6">
        {/* Title and Filter Buttons */}
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">All Orders</h2>
          <div className="flex gap-6">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                className={`px-5 py-2 rounded-full font-medium shadow ${
                  selectedStatus === btn.value ? btn.className : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setSelectedStatus(btn.value)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
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
            {filterOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`text-center ${index % 2 === 0 ? 'bg-[#F7F6FF]' : 'bg-white'}`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2 flex items-center justify-center gap-2">
                  <img
                    src="/default-product.png"
                    alt="product"
                    className="rounded-full w-8 h-8"
                  />
                  <span>{order.products.join('')}</span>
                </td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.payment}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">${order.total.toFixed(2)}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusStyles[order.status] || 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    className="text-[#5F33E1]"
                    title="Update"
                    onClick={() => {
                        setSelectedOrder(order); setIsDialogOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {isDialogOpen && (
        <UpdateStatusDialog
            currentStatus={selectedOrder?.status}
            onClose={() => setIsDialogOpen(false)}
            onSave={(newStatus) => {
            console.log('Save new status:', newStatus);
            // Cập nhật order ở đây
            setIsDialogOpen(false);
            }}
        />
        )}
    </div>
    
  );
};

export default AllOrder;
