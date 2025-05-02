import Sidebar from '../../components/admin/adminSidebar';
import TitlePage from '../../components/shares/TitlePage';
import { useEffect, useState } from 'react';
import { getAllPendingShops, approveShop, rejectShop } from '../../api/adminAPI';
// Main Pending Shops Page
const PendingShops = () => {
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"/>
  
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await getAllPendingShops();
        setShops(response);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }
  , []);

  const handleApprove = async (shopId) => {
    try {
      const response = await approveShop(shopId);
      if (response) {
        setShops(shops.filter(shop => shop.id !== shopId));
      } else {
        console.error("Error approving shop:", response);
      }
    } catch (error) {
      console.error("Error approving shop:", error);
    }
  }
  
  const handleReject = async (shopId) => {
    try {
      const response = await rejectShop(shopId);
      if (response) {
        setShops(shops.filter(shop => shop.id !== shopId));
      } else {
        console.error("Error rejecting shop:", response);
      }
    } catch (error) {
      console.error("Error rejecting shop:", error);
    }
  }

  return (
    <div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-4/5 p-6">
          <TitlePage title={"Pending Shops"} />
          <table className="w-full text-left">
            <thead>
              <tr className="text-center">
                <th className="p-2">No.</th>
                <th className="p-2">Shop Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone Number</th>
                <th className="p-2">Shop Address</th>
                <th className="p-2">Bank Name</th>
                <th className="p-2">Account Number</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop, index) => (
                <tr
                  key={shop.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"
                  }`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{shop.name}</td>
                  <td className="p-2">{shop.email}</td>
                  <td className="p-2">{shop.phone}</td>
                  <td className="p-2">{shop.address}</td>
                  <td className="p-2">{shop.bankName}</td>
                  <td className="p-2">{shop.bankAccount}</td>
                  <td className="p-2">
                    <div className="flex flex-col gap-2">
                        <button
                        onClick={() => handleApprove(shop.id)}
                        className="flex items-center justify-center bg-[#E6F4EA] text-[#34A853] border border-[#34A853] px-2 py-1 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Approve
                        </button>
                        <button 
                        onClick={() => handleReject(shop.id)}
                        className="flex items-center justify-center bg-[#FCE8E6] text-[#EA4335] border border-[#EA4335] px-2 py-1 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        Reject
                        </button>
                    </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
    </div>
  );
};

export default PendingShops;