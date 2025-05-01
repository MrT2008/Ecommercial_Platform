import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ShopHeaderShopPage = ({ shopId }) => {
  const [shop, setShop] = useState({
    id: '12345678982',
    name: 'Miumiu Store',
    rating: 5,
    evaluation: '12.6k',
    products: 102,
    image: 'https://randomuser.me/api/portraits/cats/2.jpg', // Placeholder cat image
  });
  
  // Fetch shop data based on ID (mock implementation)
  useEffect(() => {
    // In a real app, you'd fetch data from an API
    // For now we'll just use mock data
  }, [shopId]);

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faStar} 
          className={`text-yellow-400 text-lg`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-4 mb-6">
      <div className="bg-gray-50 p-6 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          {/* Shop Info - Left Side */}
          <div className="flex items-center">
            <div className="mr-6">
              <img 
                src={shop.image} 
                alt={`${shop.name} logo`} 
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
            
            <div>
              {/* Tên shop - font lớn hơn */}
              <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
              
              {/* Shop ID - font nhỏ hơn */}
              <p className="text-sm text-gray-500 mb-3">Shop ID: {shop.id}</p>
              
              {/* Rating và thông tin - hiển thị ngang với phân cách */}
              <div className="flex items-center">
                <div className="flex mr-4">
                  {renderStars(shop.rating)}
                </div>
                
                <div className="text-base flex items-center">
                  <span className="text-gray-700 font-medium mr-1">Evaluate:</span>
                  <span className="text-gray-700 mr-3">{shop.evaluation}</span>
                  
                  <span className="border-l border-gray-300 h-6 mx-4"></span>
                  
                  <span className="text-gray-700 font-medium mr-1">Product:</span>
                  <span className="text-gray-700">{shop.products}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions - Right Side */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center justify-center px-8 py-3 bg-blue-50 border border-blue-600 rounded-md text-blue-600 font-medium">
              <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
              Chat Now
            </button>
            
            <button className="flex items-center justify-center px-8 py-3 bg-red-50 border border-red-500 rounded-md text-red-500 font-medium">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeaderShopPage;