import "/src/styles/global.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  id = "1",
  productName = "AK-900 Wired Keyboard",
  salePrice = 960,
  originalPrice = 1160,
  discountPercentage,
  isNew = false,
  rating = 4,
  reviewCount = 75,
  imageUrl = "/api/placeholder/400/320"
}) => {
  const navigate = useNavigate();

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-2xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    console.log("Added to wishlist");
  };

  return (
    <div
      className="max-w-xs bg-gray-50 rounded-lg overflow-hidden shadow cursor-pointer transition hover:shadow-md"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative p-4 bg-gray-100">
        {isNew && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm">
            NEW
          </div>
        )}
        <button
          className="absolute top-4 right-4 bg-white p-1 px-2 rounded-full"
          onClick={handleWishlistClick}
        >
          <FontAwesomeIcon icon={faHeart} size="lg" className="text-gray-300" />
        </button>
        <img
          src={imageUrl}
          alt={productName}
          className="h-48 w-full object-contain mx-auto"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{productName}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500 font-semibold">${salePrice}</span>
          <span className="text-gray-500 line-through text-sm">${originalPrice}</span>
          {discountPercentage && (
            <span className="text-green-600 text-sm">-{discountPercentage}%</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars()}</div>
          <span className="text-gray-500 text-sm">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string,
  productName: PropTypes.string,
  salePrice: PropTypes.number,
  originalPrice: PropTypes.number,
  discountPercentage: PropTypes.number,
  isNew: PropTypes.bool,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  imageUrl: PropTypes.string
};

export default ProductCard;
