import Heading from '../components/header/heading';
import HeadingBar from '../components/header/main';
import Footer from '../components/footer/main';
import Sidebar from '../components/admin/adminSidebar';
import ShopCard from '../components/admin/shopCard';

const ListAllShops = () => {
  // Sample shops data
  const shops = [
    {
      id: '1234567892',
      name: 'Miumiu Store',
      image: '/path-to-cat-image.jpg', // Replace with actual image path
      evaluations: 12.6,
      products: 102,
      rating: 5
    },
    {
      id: '1234567892',
      name: 'Miumiu Store',
      image: '/path-to-cat-image.jpg', // Replace with actual image path
      evaluations: 12.6,
      products: 102,
      rating: 5
    },
    {
      id: '1234567892',
      name: 'Miumiu Store',
      image: '/path-to-cat-image.jpg', // Replace with actual image path
      evaluations: 12.6,
      products: 102,
      rating: 5
    },
    {
      id: '1234567892',
      name: 'Miumiu Store',
      image: '/path-to-cat-image.jpg', // Replace with actual image path
      evaluations: 12.6,
      products: 102,
      rating: 5
    }
  ];

  return (
    <div>
      <Heading />
      <HeadingBar />
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
      <Footer />
    </div>
  );
};

export default ListAllShops;