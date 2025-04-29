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
      <div className="flex-1 container mx-auto py-10 px-8 max-w-3xl">
        <h2 className="text-2xl font-bold text-[#FFA50B] mb-6">Change Password</h2>
        <form className="space-y-6">
          <div className="flex items-center gap-4">
            <label htmlFor="oldPassword" className="w-1/4 text-sm font-medium text-gray-700">
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
            <label htmlFor="newPassword" className="w-1/4 text-sm font-medium text-gray-700">
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
            <label htmlFor="confirmPassword" className="w-1/4 text-sm font-medium text-gray-700">
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
  );
};

export default AccountPassword;