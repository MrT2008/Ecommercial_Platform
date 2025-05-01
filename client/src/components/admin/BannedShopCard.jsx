import PropTypes from 'prop-types';
import { useState } from 'react';
import { unbanShop } from '../../api/adminAPI';
//Banned Shop Card Component
const BannedShopCard = ({ shop, onUnbanSuccess }) => {
    const handleUnban = async () => {
        try {
            const response = await unbanShop(shop.id);
            if (response) {
                onUnbanSuccess(shop.id);
            } else {
                console.error("Error unbanning shop:", response);
            }
        } catch (error) {
            console.error("Error unbanning shop:", error);
        }
    }
    return (
      <div className="shop-item flex items-center py-4 border-b border-gray-100 last:border-b-0">
        <div className="shop-image w-14 h-14 rounded-full overflow-hidden mr-4 bg-gray-100">
          <img src={shop.image || "/api/placeholder/60/60"} alt="Shop avatar" />
        </div>
        
        <div className="shop-details flex-1">
          <div className="shop-name font-bold text-base mb-1">Shop Name: {shop.name}</div>
          
          <div className="shop-info flex items-center text-sm text-gray-600 mb-1 flex-wrap">
            <span className="shop-id mr-4">Shop ID: {shop.id}</span>
            
            <span className="shop-rating text-yellow-500 mr-4">
              {'★'.repeat(shop.rating)}
            </span>
            
            <span className="separator text-gray-300 mx-2">|</span>
            
            <span className="shop-evaluation mr-4">Evaluate: {shop.evaluations}</span>
            
            <span className="separator text-gray-300 mx-2">|</span>
            
            <span className="shop-products">Product: {shop.products}</span>
          </div>
          
          <div className="ban-reason text-red-600 text-sm">Reason for ban: {shop.banReason}</div>
        </div>
        
        <button
          onClick={handleUnban}
        className="unban-btn bg-white text-green-500 border border-green-500 rounded px-4 py-1.5 text-sm flex items-center hover:bg-green-50 transition-all">
          <span className="unban-icon mr-1">✓</span>
          Unban
        </button>
      </div>
    );
  };
  
// Prop Validation
BannedShopCard.propTypes = {
    shop: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      shopId: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      evaluations: PropTypes.string.isRequired,
      products: PropTypes.number.isRequired,
      banReason: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired,
    onUnbanSuccess: PropTypes.func.isRequired,
  };
  export default BannedShopCard;
  