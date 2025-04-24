import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
const FlashSalesCard = ({
    id = "1",
    productName = "AK-900 Wired Keyboard",
    salePrice = 960,
    originalPrice = 1160,
    isNew = true,
    rating = 4,
    reviewCount = 75,
    imageUrl = "/api/placeholder/400/320"
}) => {
    const navigate = useNavigate();
    // Calculate stars for rating
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
    // Handle card click to navigate to product details
    const handleCardClick = () => {
        navigate(`/product/${id}`);
    };

    // Handle wishlist button click without triggering navigation
    const handleWishlistClick = (e) => {
        e.stopPropagation(); // Prevent the card click event
        // Add wishlist functionality here
        console.log("Added to wishlist");
    };


    return (
        <div className="max-w-xs bg-gray-50 rounded-lg overflow-hidden shadow" onClick={handleCardClick}>
            {/* Product Image Container */}
            <div className="relative p-4 bg-gray-100">
                {/* New Tag */}
                {isNew && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm">
                        NEW
                    </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 bg-white p-1 px-2 rounded-full" onClick={handleWishlistClick}>
                    <FontAwesomeIcon icon={faHeart} size="lg" className="text-gray-300" />
                </button>

                {/* Product Image */}
                <img
                    src={imageUrl}
                    alt={productName}
                    className="h-48 w-full object-contain mx-auto"
                />
            </div>

            {/* Add to Cart Button */}
            {/* <button className="w-full bg-black text-white py-3 text-center font-medium">
                Add To Cart
            </button> */}

            {/* Product Details */}
            <div className="p-4">
                {/* Product Name */}
                <h3 className="text-lg font-medium mb-2">{productName}</h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-500 font-medium">${salePrice}</span>
                    <span className="text-gray-500 line-through">${originalPrice}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {renderStars()}
                    </div>
                    <span className="text-gray-500">({reviewCount})</span>
                </div>
            </div>
        </div>
    );
};
FlashSalesCard.propTypes = {
    id: PropTypes.string,
    productName: PropTypes.string,
    salePrice: PropTypes.number,
    originalPrice: PropTypes.number,
    isNew: PropTypes.bool,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    imageUrl: PropTypes.string
};


export default FlashSalesCard;