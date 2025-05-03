import React, { useState,useEffect } from "react"; 
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";
<<<<<<< Updated upstream
import EditProfileDialog from "../account/EditProfileDialog"; 

const AccountProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        // phone: "",
        image: "", 
    });
    const [image, setImage] = useState("");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // 👉 Fetch API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/buyer/${userId}/viewProfile`);
                const result = await response.json();
                const user = result.data.User;
                
                setUserInfo({
                    username: user.fullName || "", 
                    email: user.email || "",
                    // phone: "", 
                    image: user.imageURL || "/images/cat-avatar.jpg"
                });
                setImage(user.imageURL || "/images/cat-avatar.jpg");
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

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
=======
import EditProfileDialog from "../account/EditProfileDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { getBuyerId } from "../../api/buyerAPI";

const AccountProfile = () => {
  const buyerId = getBuyerId();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    image: "/images/cat-avatar.jpg",
  });
  const [previewImage, setPreviewImage] = useState("/images/cat-avatar.jpg");
  const [imageFile, setImageFile] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    (async () => {
      if (!buyerId) return;
      try {
        const res = await fetch(`http://localhost:8080/buyer/${buyerId}/viewProfile`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        const user = data.data.User;
        setUserInfo({
          username: user.fullName || "",
          email: user.email || "",
          image: user.imageURL || "/images/cat-avatar.jpg",
        });
        setPreviewImage(user.imageURL || "/images/cat-avatar.jpg");
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Không thể tải dữ liệu người dùng");
      }
    })();
  }, [buyerId]);

  // Save profile
  const handleSaveProfile = async (updatedInfo) => {
    setIsSaving(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("type", "user");
      formData.append("fullName", updatedInfo.username);
      formData.append("email", updatedInfo.email);
      if (imageFile) {
        formData.append("imageURL", imageFile);
      }

      const res = await fetch(`http://localhost:8080/buyer/${buyerId}/editProfile`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      console.log("Profile updated:", data);

      const updatedUser = await fetch(`http://localhost:8080/buyer/${buyerId}/viewProfile`);

      setUserInfo((prev) => ({
        ...prev,
        username: updatedInfo.username,
        email: updatedInfo.email,
        image: updatedUser.imageURL || prev.image,
      }));
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Lưu profile thất bại");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="w-4/5 p-6 py-12 px-8">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-4">Edit Your Profile</h2>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

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
                                {/* <div className="flex">
                                    <div className="w-45 text-[#666666] font-medium">Phone Number</div>
                                    <div>{userInfo.phone}</div>
                                </div> */}
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

<<<<<<< Updated upstream
            <EditProfileDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={handleSaveProfile}
                user={userInfo}
=======
            {/* Divider */}
            <div className="border-l border-gray-400 mx-6"></div>

            {/* Avatar */}
            <div className="w-48 flex flex-col items-center">
              <img
                src={previewImage}
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
                <FontAwesomeIcon icon={faUpload} />
                Upload Image
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <SecondaryButton
              title={isSaving ? "Saving..." : "Save"}
              onClick={() => handleSaveProfile(userInfo)}
              disabled={isSaving}
>>>>>>> Stashed changes
            />
        </div>
    );
};

export default AccountProfile;
