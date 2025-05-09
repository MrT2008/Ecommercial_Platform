import { useEffect, useState } from "react";

const AddressDialog = ({ onClose }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
    const [addresses, setAddresses] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const fetchAddresses = () => {
        if (!userId) return;

        fetch(`http://localhost:8080/buyer/${userId}/shippingInfo`)
            .then((res) => res.json())
            .then((data) => {
                if (data.userShippingInfo) {
                    // Lọc ra các địa chỉ có status khác "delete"
                    const activeAddresses = data.userShippingInfo.filter(item => item.status !== "delete");

                    const formatted = activeAddresses.map((item) => ({
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

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/buyer/6/shippingInfo/setdefault", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedId }),
            });

            if (!response.ok) throw new Error("Failed to set default");

            onClose(); // Đóng dialog nếu thành công
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Chọn địa chỉ giao hàng</h2>

                <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {/* {addresses.map(addr => (
                        <li key={addr.id} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="defaultAddress"
                                checked={selectedId === addr.id}
                                onChange={() => setSelectedId(addr.id)}
                            />
                            <span>{addr.recipientName} - {addr.deliveryAddress}</span>
                        </li>
                    ))} */}
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

                        </div>
                    ))}
                </ul>

                <div className="flex justify-end space-x-3 mt-5">
                    <button onClick={onClose} className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400">
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={selectedId === null}
                    >
                        Đặt làm mặc định
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressDialog;
