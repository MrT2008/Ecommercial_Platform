import React, { useState } from "react";
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddNewAddressDialog from "../../pages/account/AddNewAddressDialog";

const AccountAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      name: "Nguyen Kieu Phuong",
      phone: "+84 987777666",
      address:
        "Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP Hồ Chí Minh",
      isDefault: true,
    },
    {
      name: "Nguyen Kieu Phuong",
      phone: "+84 987777666",
      address:
        "Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP Hồ Chí Minh",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // null = add mode

  const openAddDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (address, index) => {
    setEditingAddress({ ...address, index }); 
    setIsDialogOpen(true);
  };

  const handleSaveAddress = (formData) => {
    const newAddress = {
      name: formData.fullName,
      phone: formData.phoneNumber,
      address: formData.address,
      isDefault: formData.isDefault,
    };

    setAddresses((prev) => {

      const updated = prev.map((addr) => ({
        ...addr,
        isDefault: formData.isDefault ? false : addr.isDefault,
      }));

      if (editingAddress && editingAddress.index !== undefined) {

        updated[editingAddress.index] = newAddress;
        return updated;
      } else {

        return [...updated, newAddress];
      }
    });

    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSetDefault = (index) => {
    setAddresses((prev) =>
      prev.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      }))
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-4/5 p-6 py-12 px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Address Book</h2>
          <SecondaryButton title="Add new address" onClick={openAddDialog} />
        </div>

        <div className="space-y-6">
        {addresses.map((address, index) => (
          <div
            key={index}
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

            {/* Right */}
            <div className="flex items-center gap-4">
              <button
                className="text-blue-500"
                onClick={() => openEditDialog(address, index)}
              >
                edit
              </button>

              <button
                className="text-red-500"
                onClick={() => handleDelete(index)}
              >
                delete
              </button>

              <button
                disabled={address.isDefault}
                className={`px-4 py-2 rounded border transition ${
                  address.isDefault
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "text-current border-current hover:bg-gray-100"
                }`}
                style={{
                  color: address.isDefault ? "gray" : "var(--main)",
                  borderColor: address.isDefault ? "gray" : "var(--main)",
                }}
                onClick={() => {
                  if (!address.isDefault) handleSetDefault(index);
                }}
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
