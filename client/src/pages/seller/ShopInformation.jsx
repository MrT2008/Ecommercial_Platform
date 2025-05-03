import Sidebar from '../../components/seller/sellerSidebar';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../components/shares/SecondaryButton";
import EditInfShopDialog from "../seller/EditShopInfDialog";
import { getSellerId, getShopIdFromUserId } from "../../api/sellerAPI";

const ShopInformation = () => {

    const [shopInfo, setShopInfo] = useState({});
    const [image, setImage] = useState("/images/fashion-store-logo.png");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    // const [image, setImage] = useState(shopInfo.image);
    // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for controlling dialog visibility

    useEffect(() => {
        const fetchShopInfo = async () => {
            try {
                const userId = getSellerId();
                console.log(`Đang fetch shop cho user ID: ${userId}`);

                const shopId = await getShopIdFromUserId(userId);
                console.log(`Shop ID: ${shopId}`);

                const res = await fetch(`http://localhost:8080/seller/${shopId}/getInformation`);
                if (!res.ok) {
                    throw new Error(`Không thể lấy thông tin shop: ${res.status}`);
                }

                const data = await res.json();
                if (data.shop) {
                    setShopInfo(data.shop);
                    setImage(data.shop.avatarUrl || "/images/fashion-store-logo.png");
                } else {
                    throw new Error("Dữ liệu shop không tồn tại trong response");
                }

                // setError(null);
            } catch (err) {
                console.error("Không thể fetch thông tin shop:", err);
                // setError("Không thể tải thông tin shop. Vui lòng thử lại sau.");
                setShopInfo({});
            }
            // finally {
            //     setIsLoading(false);
            // }
        };

        fetchShopInfo();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleSaveShopInfo = (updatedShopInfo) => {
    //     setShopInfo(updatedShopInfo); // Update the shop info when saved
    //     setIsEditDialogOpen(false); // Close the dialog after saving
    // };
    const handleSaveShopInfo = async (updatedShopInfo) => {
        try {
            const userId = getSellerId();
            console.log(`Đang fetch shop cho user ID: ${userId}`);

            const shopId = await getShopIdFromUserId(userId);
            console.log(`Shop ID: ${shopId}`);

            // Gửi POST request lên server
            const response = await fetch(`http://localhost:8080/seller/${shopId}/updateInformation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedShopInfo),
            });
    
            if (!response.ok) {
                throw new Error('Cập nhật thông tin thất bại');
            }
    
            const result = await response.json();
    
            // Cập nhật lại UI
            setShopInfo(result.shop);  // Hoặc updatedShopInfo nếu backend không trả về
            setIsEditDialogOpen(false); // Đóng dialog
        } catch (error) {
            console.error("Lỗi khi cập nhật shop:", error);
        }
    };
    

    return (
        <div className="flex">
            <Sidebar />

            <div className="w-4/5 p-6 py-12 px-8">
                <h2 className="text-2xl font-bold mb-6 text-[#FFA50B]">Shop Information</h2>

                <div className="bg-white p-8 rounded-md shadow flex flex-col justify-between min-h-[400px]">
                    <div className="flex">
                        {/* Left Side: Shop Info */}
                        <div className="flex-1 pr-6 relative">
                            <a
                                href="#"
                                className="absolute right-0 top-0 text-blue-700 text-sm"
                                onClick={() => setIsEditDialogOpen(true)} // Open dialog when clicked
                            >
                                Edit Information
                            </a>

                            <div className="space-y-4 mt-6">
                                <div className="flex">
                                    <div className="w-40 text-[#666666] font-medium">Shop Name</div>
                                    <div>{shopInfo.name}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 text-[#666666] font-medium">Email</div>
                                    <div>{shopInfo.email}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 text-[#666666] font-medium">Phone Number</div>
                                    <div>{shopInfo.phone}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 text-[#666666] font-medium">Address</div>
                                    <div>{shopInfo.address}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 text-[#666666] font-medium">Bank Name</div>
                                    <div>
                                        <div>{shopInfo.bankName}</div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 text-[#666666] font-medium">Bank Account</div>
                                    <div>
                                        <div>{shopInfo.bankAccount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-l mx-6"></div>

                        {/* Right Side: Avatar */}
                        <div className="w-48 flex flex-col items-center">
                            <img
                                src={image}
                                alt="Shop Logo"
                                className="w-24 h-24 object-cover rounded-full border mb-4"
                            />
                            <label className="border rounded px-4 py-2 flex items-center gap-2 cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                <div className="flex items-center gap-2 justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                                    </svg>
                                    Upload Image
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Save Button at bottom right */}
                    <div className="flex justify-end mt-6">
                        <SecondaryButton title="Save" />
                    </div>
                </div>
            </div>

            {/* EditInfShopDialog - Conditional rendering based on dialog state */}
            <EditInfShopDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={handleSaveShopInfo}
                shop={shopInfo}
            />
        </div>
    );
};

export default ShopInformation;
