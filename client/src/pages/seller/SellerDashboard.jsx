import Sidebar from '../../components/seller/sellerSidebar';
import { useState } from 'react';

const SellerDashboard = () => {
  const [soldProducts, setSoldProducts] = useState([
    {
      id: 1,
      name: 'Hat',
      price: 4.95,
      sold: 33,
      image: '/path-to-your-image/hat.png', // sửa lại path cho đúng nếu cần
    },
    {
      id: 2,
      name: 'Hat',
      price: 4.95,
      sold: 33,
      image: '/path-to-your-image/hat.png',
    },
    {
      id: 3,
      name: 'Hat',
      price: 4.95,
      sold: 33,
      image: '/path-to-your-image/hat.png',
    },
  ]);

  return (
    <div className="flex">
      <Sidebar />
    
      <div className="w-4/5 p-6">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Dasboard</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* To do list */}
          <div className="bg-white shadow rounded-lg p-10">
            <h3 className="text-lg font-semibold mb-4 text-[#020202]">To do list</h3>
            <div className="flex justify-between text-center">
              <div>
                <p className="text-xl font-bold text-[#000282]">40</p>
                <p className="text-gray-600 text-sm">Pending goods</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#000282]">100</p>
                <p className="text-gray-600 text-sm">Processed</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#000282]">10</p>
                <p className="text-gray-600 text-sm">Canceled</p>
              </div>
            </div>
          </div>

          {/* Sales Analysis */}
          <div className="bg-white shadow rounded-lg p-10">
            <h3 className="text-lg font-semibold mb-4 text-[#020202]">Sales Analysis</h3>
            <div className="flex justify-between text-center">
              <div>
                <p className="text-xl font-bold text-[#000282]">20,000,000</p>
                <p className="text-gray-600 text-sm">Total Sales</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#000282]">100</p>
                <p className="text-gray-600 text-sm">Total Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sold Products Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#020202]">Sold Products</h3>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-center text-[#020202] border-b">
                <th className="p-2">Product ID</th>
                <th className="p-2">Products</th>
                <th className="p-2">Price</th>
                <th className="p-2">Sold</th>
              </tr>
            </thead>
            <tbody>
              {soldProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`text-center ${index % 2 === 0 ? 'bg-[#F7F6FF]' : 'bg-white'}`}
                >
                  <td className="p-2">{product.id}</td>
                  <td className="p-2 flex items-center justify-center gap-2">
                    <img
                      src={product.image}
                      alt="product"
                      className="rounded-full w-8 h-8"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="p-2">${product.price.toFixed(2)}</td>
                  <td className="p-2">{product.sold} pcs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
