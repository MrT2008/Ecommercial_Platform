import Sidebar from '../../components/admin/adminSidebar';
import ShopCard from '../../components/admin/shopCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitlePage from '../../components/shares/TitlePage';
import { getAllShops, banShop } from '../../api/adminAPI';


const ListAllShops = () => {
    
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await getAllShops();
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

    const handleBanSuccess = (shopId) => {
        setShops(prev => prev.filter(shop => shop.id !== shopId));
    }

    return (
        <div>

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="w-4/5 p-6">
                    <TitlePage title={"List Shops"} />

                    <div className="bg-white rounded-lg shadow p-6">
                        {shops.map((shop, index) => (
                            <ShopCard key={index} shop={shop} onBanSuccess={handleBanSuccess} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListAllShops;