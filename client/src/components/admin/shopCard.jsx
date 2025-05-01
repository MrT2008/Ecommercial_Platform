import PropTypes from 'prop-types';
import { useState } from 'react';
import { banShop } from '../../api/adminAPI';
import BanReasonDialog from './BanReasonDialog'; 

const ShopCard = ({ shop, onBanSuccess }) => {
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);

  const handleConfirmBan = async (reason) => {
    try {
      const response = await banShop(shop.id, reason); 
      if (response) {
        onBanSuccess(shop.id);
      } else {
        console.error("Error banning shop:", response);
      }
    } catch (error) {
      console.error("Error banning shop:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex items-center">
          <img 
            src={shop.image} 
            alt={shop.name} 
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="font-medium">Shop Name : {shop.name}</h3>
            <p className="text-sm text-gray-600">Shop ID: {shop.id}</p>
            <div className="flex items-center mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="mx-4 text-gray-500">|</span>
              <span className="text-sm">Evaluate: {shop.evaluations}k</span>
              <span className="mx-4 text-gray-500">|</span>
              <span className="text-sm">Product: {shop.products}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
            View Shop
          </button>
          <button
            onClick={() => setIsBanDialogOpen(true)}
            className="px-4 py-2 border border-red-300 rounded text-red-500 hover:bg-red-50 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Ban
          </button>
        </div>
      </div>

      {/* Ban Reason Dialog */}
      <BanReasonDialog
        isOpen={isBanDialogOpen}
        onClose={() => setIsBanDialogOpen(false)}
        onSubmit={handleConfirmBan}
      />
    </>
  );
};

ShopCard.propTypes = {
  shop: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    evaluations: PropTypes.number.isRequired,
    products: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onBanSuccess: PropTypes.func.isRequired,
};

export default ShopCard;
