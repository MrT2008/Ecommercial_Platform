import Sidebar from '../../components/seller/sellerSidebar';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../components/shares/SecondaryButton";

const ShopInformation = () => {
    const [shopInfo] = useState({
        name: "MiuMiu Store",
        email: "ntptmiumiu12345@gmail.com",
        phone: "02343256789",
        address: "Tran Dai Nghia Street, Thu Duc, Linh Xuan Ward, Thu Duc City, Ho Chi Minh City",
        bankHolder: "Nguyen Kieu Phuong",
        bank: "Vietcombank: 78******86",
        image: "/images/fashion-store-logo.png"
    });

    // ✅ Add image state to dynamically update preview
    const [image, setImage] = useState(shopInfo.image);

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

    return (
        <div className="flex">
            <Sidebar />

            <div className="w-4/5 p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#FFA50B]">Shop Information</h2>

                <div className="bg-white p-8 rounded-md shadow flex flex-col justify-between min-h-[400px]">
                    <div className="flex">
                        {/* Left Side: Shop Info */}
                        <div className="flex-1 pr-6 relative">
                            <a href="#" className="absolute right-0 top-0 text-blue-700 text-sm">
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
                                    <div className="w-40 text-[#666666] font-medium">Bank Account</div>
                                    <div>
                                        <div>{shopInfo.bankHolder}</div>
                                        <div>{shopInfo.bank}</div>
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
        </div>
    );
};

export default ShopInformation;
