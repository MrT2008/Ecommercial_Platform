import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faTruck, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('all');

  // Product data
  const product = {
    id: 'g-92',
    name: 'Havic HV G-92 Gamepad',
    price: 192.00,
    rating: 4.5,
    reviewCount: 150,
    stock: true,
    description: 'PlayStation 5 Controller Skin: High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.',
    image: '/product-gamepad.jpg', // Replace with actual image path
  };

  // Shop data
  const shop = {
    name: 'Miumiu Shop',
    rating: 5,
    evaluation: '12.6k',
    products: 102,
    image: '/shop-logo.jpg', // Replace with actual image path
  };

  // Reviews data
  const reviews = [
    {
      id: 1,
      user: 'Phương Liên',
      date: '22/11/2023',
      rating: 5,
      comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
    },
    {
      id: 2,
      user: 'Phương Liên',
      date: '22/11/2023',
      rating: 5,
      comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
    },
    {
      id: 3,
      user: 'Phương Liên',
      date: '22/11/2023',
      rating: 5,
      comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
    },
    {
      id: 4,
      user: 'Phương Liên',
      date: '22/11/2023',
      rating: 5,
      comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
    }
  ];

  // Calculate average rating
  const avgRating = 4.0;

  // Rating counts
//   const ratingCounts = {
//     5: 120,
//     4: 20,
//     3: 5,
//     2: 3,
//     1: 2
//   };

  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStarRegular} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <a href="/account" className="hover:text-blue-600">Account</a>
        <span className="mx-2">/</span>
        <a href="/gaming" className="hover:text-blue-600">Gaming</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Havic HV G-92 Gamepad</span>
      </div>

      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 rounded-lg">
          <img 
            src={product.image || "/api/placeholder/400/400"} 
            alt={product.name} 
            className="w-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-1">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-500">({product.reviewCount} Reviews)</span>
            <span className="text-green-500 ml-4">{product.stock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          
          {/* Price */}
          <div className="text-2xl font-bold text-red-600 mb-4">${product.price.toFixed(2)}</div>
          
          {/* Description */}
          <p className="text-gray-700 mb-8">{product.description}</p>
          
          <hr className="my-6" />
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100"
              >
                −
              </button>
              <input 
                type="text" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} 
                className="w-12 text-center py-2"
              />
              <button 
                onClick={increaseQuantity}
                className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
              <span className="mr-2">Add to cart</span>
            </button>

            <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
              Buy Now
            </button>
          </div>

          {/* Delivery Options */}
          <div className="border border-gray-200 rounded mb-6">
            <div className="p-4 flex items-start">
              <FontAwesomeIcon icon={faTruck} className="text-gray-700 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Free Delivery</h3>
                <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <hr />
            <div className="p-4 flex items-start">
              <FontAwesomeIcon icon={faArrowRotateLeft} className="text-gray-700 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Return Delivery</h3>
                <p className="text-sm text-gray-500">Free 30 Days Delivery Returns. <span className="text-blue-600">Details</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Section */}
      <div className="flex items-center justify-between border-t border-b py-6 mb-8">
        <div className="flex items-center">
          <img 
            src={shop.image || "/api/placeholder/64/64"} 
            alt={shop.name} 
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-medium text-lg">{shop.name}</h3>
            <div className="flex text-yellow-400">
              {Array(5).fill().map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="font-medium text-blue-600">{shop.evaluation}</div>
            <div className="text-sm text-gray-500">Evaluate</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{shop.products}</div>
            <div className="text-sm text-gray-500">Product</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
            Chat Now
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
            View Shop
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border rounded-lg p-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-end">
            <span className="text-3xl font-bold">{avgRating}</span>
            <span className="text-xl text-gray-500 ml-1">/ 5</span>
            <div className="flex text-yellow-400 ml-4">
              {renderStars(avgRating)}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              className={`px-4 py-1 rounded ${activeTab === 'all' ? 'bg-gray-200' : 'bg-white border border-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map(num => (
              <button
                key={num}
                className={`px-4 py-1 rounded flex items-center ${activeTab === num ? 'bg-yellow-100 border border-yellow-400' : 'bg-white border border-gray-300'}`}
                onClick={() => setActiveTab(num)}
              >
                {num} <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                  <span className="font-medium text-blue-800">{review.user.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium">{review.user}</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {Array(review.rating).fill().map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;