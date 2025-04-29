import React, { useState } from "react";
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";

const AccountPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-4/5 p-6 py-12 px-8">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-6">Change Password</h2>

        <div className="bg-white p-8 rounded-md shadow flex flex-col justify-between ">
          <form className="space-y-6">
            <div className="flex items-center gap-4">
              <label htmlFor="oldPassword" className="w-40 text-[#666666] font-medium">
                Old password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#FFA50B] focus:border-[#FFA50B]"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="newPassword" className="w-40 text-[#666666] font-medium">
                New password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#FFA50B] focus:border-[#FFA50B]"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="confirmPassword" className="w-40 text-[#666666] font-medium">
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 py-2 px-3 focus:outline-none focus:ring-[#FFA50B] focus:border-[#FFA50B]"
              />
            </div>
            <div className="flex justify-end">
              <SecondaryButton title="Save" onClick={handleSave} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPassword;