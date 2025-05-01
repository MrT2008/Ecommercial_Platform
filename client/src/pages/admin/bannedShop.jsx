import Sidebar from '../../components/admin/adminSidebar';
import TitlePage from '../../components/shares/TitlePage';
import BannedShopCard from '../../components/admin/BannedShopCard';
import { useEffect, useState } from 'react';
import { getAllBannedShops } from '../../api/adminAPI';
// Main Banned Shops Page
const BannedShops = () => {
  const [bannedShops, setBannedShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannedShops = async () => {
      try {
        const response = await getAllBannedShops();
        setBannedShops(response);
      } catch (error) {
        console.error("Error fetching banned shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannedShops();
  }, []);

  const handleUnbanSuccess = (shopId) => {
    setBannedShops(prev => prev.filter(shop => shop.id !== shopId));
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <TitlePage title={"Banned Shops"} />
        
        <div className="shop-list bg-white border border-gray-200 rounded-lg p-4">
          {bannedShops.map(shop => (
            <BannedShopCard key={shop.id} shop={shop} onUnbanSuccess={handleUnbanSuccess} />
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannedShops;