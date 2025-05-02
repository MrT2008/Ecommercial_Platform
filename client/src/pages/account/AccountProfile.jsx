import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/account/accountSidebar';
import SecondaryButton from '../../components/shares/SecondaryButton';
import EditProfileDialog from '../account/EditProfileDialog';
import { AuthContext,  } from '../../hooks/AuthContext';

const AccountProfile = () => {
  const { user, updateUser, loading, error } = useContext(AuthContext);
  const [image, setImage] = useState(user?.imageURL || '/images/cat-avatar.jpg');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setImage(user.imageURL || '/images/cat-avatar.jpg');
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        await updateUser(user.id, formData);
        setImage(user.imageURL); // Updated via AuthContext
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSaveProfile = async (updatedInfo) => {
    try {
      await updateUser(user.id, updatedInfo);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user || loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="w-4/5 p-6 py-12 px-8">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-4">Edit Your Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white p-10 rounded-md shadow flex flex-col justify-between">
          <div className="flex mb-6">
            {/* Left Info */}
            <div className="flex-1 pr-6 relative">
              <a
                href="#"
                className="absolute right-0 top-0 text-blue-700 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Information
              </a>

              <div className="space-y-4 mt-6">
                <div className="flex">
                  <div className="w-45 text-[#666666] font-medium">Full Name</div>
                  <div>{user.fullName}</div>
                </div>
                <div className="flex">
                  <div className="w-45 text-[#666666] font-medium">Email</div>
                  <div>{user.email}</div>
                </div>
                <div className="flex">
                  <div className="w-45 text-[#666666] font-medium">Phone Number</div>
                  <div>{user.phone || 'Chưa cập nhật'}</div>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                    />
                  </svg>
                  Upload Image
                </div>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <SecondaryButton title="Save" onClick={() => handleSaveProfile(user)} />
          </div>
        </div>
      </div>

      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveProfile}
        user={user}
      />
    </div>
  );
};

export default AccountProfile;