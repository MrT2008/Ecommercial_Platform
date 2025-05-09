import { useEffect, useState } from "react";
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddNewAddressDialog from "../../pages/account/AddNewAddressDialog";

const AccountAddress = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const [addresses, setAddresses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  

  const fetchAddresses = () => {
    if (!userId) return;
    
    fetch(`http://localhost:8080/buyer/${userId}/shippingInfo`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userShippingInfo) {
          const formatted = data.userShippingInfo.map((item) => ({
            id: item.id, // Lưu ID của địa chỉ để sử dụng khi cập nhật
            name: item.receiverName,
            phone: item.phone,
            address: item.address,
            isDefault: item.status === "active",
          }));
          setAddresses(formatted);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch shipping info:", err);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const openAddDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (address, index) => {
    setEditingAddress({ ...address, index });
    setIsDialogOpen(true);
  };

  // const handleSaveAddress = async (formData) => {
  //   const payload = {
  //     receiverName: formData.fullName,
  //     address: formData.address,
  //     phone: formData.phoneNumber,
  //     status: formData.isDefault ? "active" : "inactive",
  //   };

  //   try {
  //     const response = await fetch(`http://localhost:8080/buyer/${userId}/shippingInfo`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to save address");
  //     }

  //     const savedAddress = await response.json();

  //     const newAddress = {
  //       name: savedAddress.receiverName,
  //       phone: savedAddress.phone,
  //       address: savedAddress.address,
  //       isDefault: savedAddress.status === "active",
  //     };

  //     setAddresses((prev) => {
  //       const updated = prev.map((addr) => ({
  //         ...addr,
  //         isDefault: formData.isDefault ? false : addr.isDefault,
  //       }));

  //       if (editingAddress && editingAddress.index !== undefined) {
  //         updated[editingAddress.index] = newAddress;
  //         return updated;
  //       } else {
  //         return [...updated, newAddress];
  //       }
  //     });

  //     setIsDialogOpen(false);
  //     setEditingAddress(null);
  //   } catch (error) {
  //     console.error("Error saving address:", error);
  //   }
  // };

  // const handleDelete = (index) => {
  //   if (window.confirm("Are you sure you want to delete this address?")) {
  //     setAddresses((prev) => prev.filter((_, i) => i !== index));
  //   }
  // };

  const handleSaveAddress = async (formData) => {
    const payload = {
      receiverName: formData.fullName,
      address: formData.address,
      phone: formData.phoneNumber,
      status: formData.isDefault ? "active" : "inactive",
    };

    try {
      let url = `http://localhost:8080/buyer/${userId}/shippingInfo`;
      let method = "POST";
      
      // Nếu đang chỉnh sửa địa chỉ, thêm ID vào URL và sử dụng phương thức PUT
      if (editingAddress && editingAddress.id) {
        url = `http://localhost:8080/buyer/${userId}/shippingInfo/edit`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingAddress ? 'update' : 'save'} address`);
      }

      // Sau khi cập nhật/thêm mới, tải lại danh sách địa chỉ để đảm bảo dữ liệu đồng bộ
      fetchAddresses();
      
      setIsDialogOpen(false);
      setEditingAddress(null);
    } catch (error) {
      console.error(`Error ${editingAddress ? 'updating' : 'saving'} address:`, error);
    }
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const addressToDelete = addresses[index];
        
        if (!addressToDelete || !addressToDelete.id) {
          throw new Error("Address ID not found");
        }

        const response = await fetch(`http://localhost:8080/buyer/${userId}/shippingInfo/${addressToDelete.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete address");
        }

        // Cập nhật state sau khi xóa thành công
        setAddresses((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting address:", error);
      }
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
                    <span className="text-sm text-orange-500 font-semibold">default</span>
                  )}
                </p>
                <p>{address.phone}</p>
                <p>{address.address}</p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <button className="text-blue-500" onClick={() => openEditDialog(address, index)}>
                  edit
                </button>

                <button className="text-red-500" onClick={() => handleDelete(index)}>
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
