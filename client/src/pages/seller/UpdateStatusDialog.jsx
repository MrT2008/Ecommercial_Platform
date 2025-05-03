import { useState, useEffect } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';
import { getSellerId } from "../../api/sellerAPI";

const statuses = ['Pending', 'Processing', 'Cancelled', 'Completed'];

const UpdateStatusDialog = ({ currentStatus, onClose, onSave, shopId, orderId }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  // const [shopId, setShopId] = useState(null);

  const statusStyles = {
    Completed: 'bg-green-100 text-green-600',
    Cancelled: 'bg-red-100 text-red-600',
    Processing: 'bg-yellow-100 text-yellow-600',
    Pending: 'bg-blue-100 text-blue-600',
  };

  const updateOrderStatus = async () => {
    if (!shopId || !orderId) {
      console.error('Shop ID or Order ID is missing');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/seller/${shopId}/updateOrder/${orderId}`, {
        method: 'PUT', // Cập nhật dữ liệu
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: selectedStatus.toLowerCase(), // Gửi status với chữ thường
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update order status');
      }

      // Gọi onSave để thông báo khi đã lưu xong
      onSave(selectedStatus);
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-6">
          Update Order’s Status
        </h2>

        {/* Status Buttons */}
        <div className="flex items-center justify-between mb-8">
          {statuses.map((status, index) => (
            <div key={status} className="flex items-center">
              <button
                className={`px-4 py-2 rounded-full font-semibold shadow-sm transition-all ${
                  selectedStatus === status
                    ? statusStyles[status] + ' shadow-md'
                    : 'bg-gray-300 text-gray-600'
                }`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
              {index < statuses.length - 1 && (
                <div className="w-6 h-px bg-dashed bg-[#FFA50B] mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={updateOrderStatus} />
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusDialog;
