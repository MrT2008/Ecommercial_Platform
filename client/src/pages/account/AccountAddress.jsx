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
    {
      name: "Nguyen Kieu Phuong",
      phone: "+84 987777666",
      address:
        "Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP Hồ Chí Minh",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAddress = (newAddress) => {
    setAddresses((prev) => [...prev, { ...newAddress }]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-10 px-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Address Book</h2>
          <SecondaryButton title="Add new address" onClick={() => setIsDialogOpen(true)} />
        </div>

        {/* Address List */}
        <div className="space-y-6">
          {addresses.map((address, index) => (
            <div
              key={index} // Sử dụng index làm key
              className="bg-white p-6 rounded shadow flex justify-between items-center"
            >
              <div>
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
                <button className="text-blue-500" onClick={() => alert("Edit address")}>
                  edit
                </button>
                <button className="text-red-500" onClick={() => alert("Delete address")}>
                  delete
                </button>
                <button
                  className={`px-4 py-2 rounded border transition ${
                    address.isDefault
                      ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      : "text-current border-current hover:bg-gray-100"
                  }`}
                  style={{
                    color: address.isDefault ? "gray" : "var(--main)",
                    borderColor: address.isDefault ? "gray" : "var(--main)",
                    backgroundColor: address.isDefault ? "transparent" : "transparent",
                  }}
                  onClick={() => {
                    if (!address.isDefault) alert("Set as default");
                  }}
                >
                  {address.isDefault ? "Set as Default" : "Set as default"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add New Address Dialog */}
      <AddNewAddressDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddAddress}
      />
    </div>
  );
};

export default AccountAddress;