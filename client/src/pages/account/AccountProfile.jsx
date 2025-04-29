import React, { useState } from "react"; 
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";
import EditProfileDialog from "../account/EditProfileDialog"; 

const AccountProfile = () => {
    const [userInfo, setUserInfo] = useState({
        username: "ntpt12345",
        email: "ntpt123456789@gmail.com",
        phone: "02343256789",
        image: "/images/cat-avatar.jpg", // Đường dẫn mặc định đến ảnh avatar
    });

    const [image, setImage] = useState(userInfo.image);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

    const handleSaveProfile = (updatedInfo) => {
      setUserInfo((prev) => ({
          ...prev,
          ...updatedInfo,
      }));
      setIsEditDialogOpen(false); // 👉 Đóng dialog sau khi save
    };

    return (
      <div className="min-h-screen flex">
            <Sidebar />

            <div className="w-4/5 p-6 py-12 px-8">
                <h2 className="text-2xl font-bold text-[#FFA50B] mb-4">Edit Your Profile</h2>

                <div className=" bg-white p-10 rounded-md shadow flex flex-col justify-between ">
                    <div className="flex mb-6">
                        {/* Left Info */}
                        <div className="flex-1 pr-6 relative">
                            <a
                                href="#"
                                className="absolute right-0 top-0 text-blue-700 text-sm "
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsEditDialogOpen(true);
                              }} // Placeholder
                            >
                                Edit Information
                            </a>

                            <div className="space-y-4 mt-6">
                                <div className="flex">
                                    <div className="w-45 text-[#666666] font-medium">Username</div>
                                    <div>{userInfo.username}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-45 text-[#666666] font-medium">Email</div>
                                    <div>{userInfo.email}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-45 text-[#666666] font-medium">Phone Number</div>
                                    <div>{userInfo.phone}</div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-l border-gray-400 mx-6"></div>

                        {/* Avatar Section */}
                        <div className="w-48 flex flex-col items-center">
                            <img
                                src={image}
                                alt="Avatar"
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

                    {/* Save Button inside box, bottom-left */}
                    <div className="flex justify-end">
                        <SecondaryButton title="Save" />
                    </div>
                </div>
            </div>

            <EditProfileDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={handleSaveProfile}
                user={userInfo}
            />
        </div>
    );
};

export default AccountProfile;
