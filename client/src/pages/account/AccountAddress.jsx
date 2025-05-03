// src/pages/AccountAddress.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/account/accountSidebar';
import SecondaryButton from '../../components/shares/SecondaryButton';
import AddNewAddressDialog from './AddNewAddressDialog';
import {
  getShippingInfo,
  addShippingInfo,
  updateShippingInfo,
  removeShippingInfo,
  setDefaultShippingInfo,
} from '../../api/buyerAPI';

const AccountAddress = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;
  const [addresses, setAddresses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // 1) Hàm chung để load + filter ra chỉ status !== 'delete'
  const fetchActiveAddresses = async () => {
    try {
      const data = await getShippingInfo(userId);
      const active = data
        .filter(item => item.status !== 'delete')
        .map(item => ({
          id:        item.id,
          name:      item.receiverName,
          phone:     item.phone,
          address:   item.address,
          status:    item.status,
          isDefault: item.status === 'active',
        }));
      setAddresses(active);
    } catch (err) {
      console.error('Fetch addresses failed:', err);
    }
  };

  // 2) Fetch lần đầu
  useEffect(() => {
    if (userId) fetchActiveAddresses();
  }, [userId]);

  // 3) Mở dialog Add / Edit
  const openAddDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };
  const openEditDialog = address => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  // 4) Xử lý lưu (Add hoặc Edit), rồi refetch
  const handleSaveAddress = async (formData) => {
    const payload = {
      receiverName: formData.fullName,
      phone:        formData.phoneNumber,
      address:      formData.address,
      status:       formData.isDefault ? 'active' : 'inactive',
    };

    try {
      if (editingAddress) {
        await updateShippingInfo(userId, { id: editingAddress.id, ...payload });
      } else {
        await addShippingInfo(userId, payload);
      }
      await fetchActiveAddresses();
    } catch (err) {
      console.error('Save address failed:', err);
    } finally {
      setIsDialogOpen(false);
      setEditingAddress(null);
    }
  };

  // 5) Delete ⇒ gọi API rồi refetch
  const handleDelete = async (index) => {
    const addr = addresses[index];
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      await removeShippingInfo(userId, { id: addr.id });
      await fetchActiveAddresses();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // 6) Set default ⇒ gọi API rồi update UI
  const handleSetDefault = async (index) => {
    const addr = addresses[index];
    try {
      await setDefaultShippingInfo(userId, { id: addr.id });
      setAddresses(prev =>
        prev.map(a => ({ ...a, isDefault: a.id === addr.id }))
      );
    } catch (err) {
      console.error('Set default failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="w-4/5 p-6 py-12 px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Address Book</h2>
          <SecondaryButton title="Add new address" onClick={openAddDialog} />
        </div>

        <div className="space-y-6">
          {addresses.map((address, idx) => (
            <div
              key={address.id}
              className="bg-white p-6 rounded shadow flex justify-between items-center"
            >
              <div className="max-w-3xl break-words">
                <p className="font-bold flex items-center gap-2">
                  {address.name}
                  {address.isDefault && (
                    <span className="text-sm text-orange-500 font-semibold">
                      default
                    </span>
                  )}
                </p>
                <p>{address.phone}</p>
                <p>{address.address}</p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="text-blue-500"
                  onClick={() => openEditDialog(address)}
                >
                  edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(idx)}
                >
                  delete
                </button>
                <button
                  disabled={address.isDefault}
                  className={`px-4 py-2 rounded border transition ${
                    address.isDefault
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'text-current border-current hover:bg-gray-100'
                  }`}
                  style={{
                    color:       address.isDefault ? 'gray' : 'var(--main)',
                    borderColor: address.isDefault ? 'gray' : 'var(--main)',
                  }}
                  onClick={() => !address.isDefault && handleSetDefault(idx)}
                >
                  Set as default
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddNewAddressDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        addressData={editingAddress}
      />
    </div>
  );
};

export default AccountAddress;
