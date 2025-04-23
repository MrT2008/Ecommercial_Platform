import Sidebar from '../components/admin/adminSidebar';
import ShopCard from '../components/admin/shopCard';
import { useEffect, useState } from 'react';
import axios from 'axios';


const ListAllShops = () => {
    // Sample shops data
    //   const shops = [
    //     {
    //       id: '1234567892',
    //       name: 'Miumiu Store',
    //       image: '/path-to-cat-image.jpg', // Replace with actual image path
    //       evaluations: 12.6,
    //       products: 102,
    //       rating: 5
    //     },
    //     {
    //       id: '1234567892',
    //       name: 'Miumiu Store',
    //       image: '/path-to-cat-image.jpg', // Replace with actual image path
    //       evaluations: 12.6,
    //       products: 102,
    //       rating: 5
    //     },
    //     {
    //       id: '1234567892',
    //       name: 'Miumiu Store',
    //       image: '/path-to-cat-image.jpg', // Replace with actual image path
    //       evaluations: 12.6,
    //       products: 102,
    //       rating: 5
    //     },
    //     {
    //       id: '1234567892',
    //       name: 'Miumiu Store',
    //       image: '/path-to-cat-image.jpg', // Replace with actual image path
    //       evaluations: 12.6,
    //       products: 102,
    //       rating: 5
    //     }
    //   ];
    const [shops, setShops] = useState([]);

    const fetchShops = async () => {
        try {
            const response = await axios.get('http://localhost:8080/seller/getAllShop');
            setShops(response.data);
        } catch (error) {
            console.error('Error fetching shops:', error);
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    return (
        <div>

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="w-4/5 p-6">
                    <h1 className="text-2xl font-bold mb-6 text-[#FFA50B]">List Shops</h1>

                    <div className="bg-white rounded-lg shadow p-6">
                        {shops.map((shop, index) => (
                            <ShopCard key={index} shop={shop} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListAllShops;