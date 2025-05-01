import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const SalesCard = ({
  id,
  productName,
  salePrice,
  originalPrice,
  discountPercentage,
  rating,
  reviewCount,
  imageUrl,
  shopId,
  isNew = true,
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
      className="max-w-xs bg-gray-50 rounded-lg overflow-hidden shadow cursor-pointer"
      onClick={handleCardClick}
    >
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

      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{productName}</h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500 font-medium">${salePrice}</span>
          <span className="text-gray-500 line-through">${originalPrice}</span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <div className="flex">{renderStars()}</div>
          <span className="text-gray-500">({reviewCount})</span>
        </div>

        <div className="text-sm text-green-600 font-semibold">
          Save {discountPercentage}% OFF
        </div>
      </div>
    </div>
  );
};

SalesCard.propTypes = {
  id: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  salePrice: PropTypes.number.isRequired,
  originalPrice: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  imageUrl: PropTypes.string,
  isNew: PropTypes.bool,
};

export default SalesCard;
