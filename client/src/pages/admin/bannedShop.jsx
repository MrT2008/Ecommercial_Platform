import Sidebar from '../../components/admin/adminSidebar';
import TitlePage from '../../components/shares/TitlePage';
import BannedShopCard from '../../components/admin/BannedShopCard';
// Main Banned Shops Page
const BannedShops = () => {
  // Fake data for banned shops
  const bannedShops = [
    {
      id: 1,
      name: "Mlumlu Store",
      shopId: "12345678792",
      rating: 5,
      evaluations: "12.6k",
      products: 102,
      banReason: "Fraudulent activities (wrong items, non-delivery)",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Mlumlu Store",
      shopId: "12345678792",
      rating: 5,
      evaluations: "12.6k",
      products: 102,
      banReason: "Fraudulent activities (wrong items, non-delivery)",
      image: "/api/placeholder/60/60"
    }
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <TitlePage title={"Banned Shops"} />
        
        <div className="shop-list bg-white border border-gray-200 rounded-lg p-4">
          {bannedShops.map(shop => (
            <BannedShopCard key={shop.id} shop={shop} />
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannedShops;