import Sidebar from '../../components/seller/sellerSidebar';
import { useState, useEffect } from 'react';
import { getSellerId, getShopIdFromUserId } from "../../api/sellerAPI";

const SellerDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = getSellerId();
                console.log(`Đang fetch shop cho user ID: ${userId}`);

                const shopId = await getShopIdFromUserId(userId);
                console.log(`Shop ID: ${shopId}`);
        const res = await fetch(`http://localhost:8080/seller/${shopId}/getDashboard`);
        const data = await res.json();

        setPendingOrders(data.pendingOrders);
        setProcessingOrders(data.processingOrders);
        setCancelledOrders(data.cancelledOrders);
        setTotalSales(data.totalSales);
        setTotalOrders(data.totalOrders);

        // lọc các sản phẩm còn hoạt động và đã bán ít nhất 1
        const sold = data.products
          .filter((p) => p.status === 'active' && p.saled > 0)
          .map((p) => ({
            id: p.id,
            name: p.name,
            price: parseFloat(p.salePrice || p.price),
            sold: p.saled,
            image: `/${p.thumbnailURL}`, // sửa path nếu cần
          }));

        setSoldProducts(sold);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
    
      <div className="w-4/5 p-6 py-12 px-8">
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
                <p className="text-xl font-bold text-[#000282]">{pendingOrders}</p>
                <p className="text-gray-600 text-sm">Pending Orders</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#000282]">{processingOrders}</p>
                <p className="text-gray-600 text-sm">Processing Orders</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#000282]">{cancelledOrders}</p>
                <p className="text-gray-600 text-sm">Canceled Orders</p>
              </div>
            </div>
          </div>

          {/* Sales Analysis */}
          <div className="bg-white shadow rounded-lg p-10">
            <h3 className="text-lg font-semibold mb-4 text-[#020202]">Sales Analysis</h3>
            <div className="flex justify-between text-center">
              <div>
                <p className="text-xl font-bold text-[#000282]">{totalSales}</p>
                <p className="text-gray-600 text-sm">Total Sales</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#000282]">{totalOrders}</p>
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
