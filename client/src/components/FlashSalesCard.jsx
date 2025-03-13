import { Heart } from 'lucide-react';
import PropTypes from 'prop-types';

const FlashSalesCard = ({
    productName = "AK-900 Wired Keyboard",
    salePrice = 960,
    originalPrice = 1160,
    isNew = false,
    rating = 4,
    reviewCount = 75,
    imageUrl = "/api/placeholder/400/320"
}) => {
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

    return (
        <div className="max-w-xs bg-gray-50 rounded-lg overflow-hidden shadow">
            {/* Product Image Container */}
            <div className="relative p-4 bg-gray-100">
                {/* New Tag */}
                {isNew && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm">
                        NEW
                    </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 bg-white p-1 rounded-full">
                    <Heart size={20} />
                </button>

                {/* Product Image */}
                <img
                    src={imageUrl}
                    alt={productName}
                    className="h-48 w-full object-contain mx-auto"
                />
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-black text-white py-3 text-center font-medium">
                Add To Cart
            </button>

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
    productName: PropTypes.string,
    salePrice: PropTypes.number,
    originalPrice: PropTypes.number,
    isNew: PropTypes.bool,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    imageUrl: PropTypes.string
};


export default FlashSalesCard;