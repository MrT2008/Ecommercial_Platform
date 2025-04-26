import { useState } from "react";
import Footer from "../../components/footer/main";

const sidebarLinks = [
  { label: "Profile", active: true },
  { label: "Address" },
  { label: "Credit Card" },
  { label: "Change password" },
];

const bannerLinks = [
  { label: "Pending Payments" },
  { label: "Ongoing Orders" },
  { label: "Completed Orders" },
  { label: "Cancellations" },
];

const AccountProfile = () => {
  const [profile, setProfile] = useState({
    username: "ntpt12345",
    email: "ntpt123456789@gmail.com",
    // phone: "02343256789",
    image:
      "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474187SoY/anh-avatar-chu-meo-dang-yeu_051724941.jpg", // Replace with actual image path
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <div className="flex flex-1 container mx-auto py-10">
        {/* Sidebar */}
        <div className="w-1/5 pr-8">
          <div className="mb-8">
            <h2 className="font-bold text-gray-700 mb-2">Manage Account</h2>
            <ul>
              {sidebarLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    className={`block py-1 px-2 rounded ${
                      link.active ? "text-[#FFA50B] font-bold" : "text-black hover:text-[#FFA50B]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-gray-700 mb-2">Banners Management</h2>
            <ul>
              {bannerLinks.map((link) => (
                <li key={link.label}>
                  <a href="#" className="block py-1 px-2 text-black hover:text-[#FFA50B]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Main Profile Card */}
        <div className="flex-1 flex flex-col">
          <h6 className="text-xl font-semibold text-[#FFA50B] mb-6">Edit Your Profile</h6>
          <div className="bg-white rounded-lg shadow p-8 flex items-stretch">
            {/* Profile Info Column */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex items-center mb-6">
                  <span className="text-gray-500 w-40">Username</span>
                  <span className="text-black">{profile.username}</span>
                </div>
                <div className="flex items-center mb-6">
                  <span className="text-gray-500 w-40">Email</span>
                  <span className="text-black">{profile.email}</span>
                </div>
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="underline underline-offset-2 decoration-2 hover:text-blue-800"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Edit Information
                  </a>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="w-px bg-gray-200 mx-8" />
            {/* Avatar & Upload Column */}
            <div className="flex flex-col items-center justify-start min-w-[220px]">
              <img
                src={profile.image}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover mb-6 border"
              />
              <button className="border px-4 py-2 rounded mb-6 text-gray-700 flex items-center gap-2">
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
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 8l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Upload Image
              </button>
              <div className="flex-1" />
              <button className="bg-[#FFA50B] text-black px-12 py-2 rounded font-semibold self-end mt-8">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountProfile;
