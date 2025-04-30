import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';
import AddNewAddressDialog from '../../pages/account/AddNewAddressDialog';

const ManageAddressDialog = ({ isOpen, onClose, onSelectAddress, defaultAddressId }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Nguyen Kieu Phuong",
      phone: "+84 987777666",
      address: "Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP. Hồ Chí Minh",
      isDefault: true,
    },
    {
      id: 2,
      name: "Nguyen Kieu Phường",
      phone: "+84 987777666",
      address: "Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP. Hồ Chí Minh",
      isDefault: false,
    },
    {
      id: 3,
      name: "Nguyen Kieu Phượng",
      phone: "+84 987777666",
      address: "Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP. Hồ Chí Minh",
      isDefault: false,
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleSetDefault = (address) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === address.id
    }));
    setAddresses(updatedAddresses);
    onSelectAddress(address);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSaveAddress = (formData) => {
    if (editingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map(addr => 
        addr.id === editingAddress.id 
          ? {
              ...addr,
              name: formData.fullName,
              phone: formData.phoneNumber,
              address: formData.address,
              isDefault: formData.isDefault
            }
          : formData.isDefault ? { ...addr, isDefault: false } : addr
      );
      setAddresses(updatedAddresses);
    } else {
      // Add new address
      const newAddress = {
        id: Date.now(), // Simple unique ID
        name: formData.fullName,
        phone: formData.phoneNumber,
        address: formData.address,
        isDefault: formData.isDefault
      };
      
      const updatedAddresses = formData.isDefault
        ? addresses.map(addr => ({ ...addr, isDefault: false })).concat(newAddress)
        : addresses.concat(newAddress);
        
      setAddresses(updatedAddresses);
      
      if (formData.isDefault) {
        onSelectAddress(newAddress);
      }
    }
    
    setIsAddDialogOpen(false);
    setEditingAddress(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Address</h2>
          <button 
            className="bg-white rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            onClick={() => {
              setEditingAddress(null);
              setIsAddDialogOpen(true);
            }}
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {addresses.map(address => (
            <div 
              key={address.id}
              className="p-4 border-b flex items-start gap-3"
            >
              <div className="mt-1">
                <input 
                  type="radio"
                  name="selectedAddress"
                  checked={address.isDefault}
                  onChange={() => handleSetDefault(address)}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{address.name}</p>
                  {address.isDefault && (
                    <span className="text-orange-500 text-xs font-semibold px-2">DEFAULT</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{address.phone}</p>
                <p className="text-sm text-gray-500">{address.address}</p>
              </div>
              
              <div>
                <button 
                  className="text-blue-600 text-sm"
                  onClick={() => handleEdit(address)}
                >
                  edit
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <OutlineButton title="Back" onClick={onClose} />
          <SecondaryButton title="OK" onClick={onClose} />
        </div>
      </div>
      
      <AddNewAddressDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSaveAddress}
        addressData={editingAddress ? {
          name: editingAddress.name,
          phone: editingAddress.phone,
          address: editingAddress.address,
          isDefault: editingAddress.isDefault
        } : null}
      />
    </div>
  );
};

ManageAddressDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectAddress: PropTypes.func.isRequired,
  defaultAddressId: PropTypes.number
};

export default ManageAddressDialog;