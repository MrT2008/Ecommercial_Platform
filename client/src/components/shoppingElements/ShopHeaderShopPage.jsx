// import { Search, ShoppingBag } from 'lucide-react';

const ShopHeaderShopPage = () => {
  return (
    <>
    <div className="header">
      <div className="header-left">
        <img src="/api/placeholder/50/50" alt="Miumiu logo" className="logo" />
        <div className="store-info">
          <h1>Miumiu Store</h1>
          <p>Shop ID: 124580385</p>
          <div className="rating">
            <div className="stars">
              ★★★★★
            </div>
            <span>Evaluation: 12.5k</span>
          </div>
        </div>
      </div>
      <div className="header-right">
        <button className="btn-outline">
          {/* <Search size={16} /> */}
          Chat Now
        </button>
        <button className="btn-solid">
          {/* <ShoppingBag size={16} /> */}
          Shopbag
        </button>
        {/* <span className="product-id">Product: ID2</span> */}
      </div>
    </div>
    <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          margin-bottom: 20px;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .logo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        }

        .store-info h1 {
          margin: 0;
          font-size: 18px;
        }

        .store-info p {
          margin: 5px 0;
          color: #666;
          font-size: 12px;
        }

        .stars {
          color: #ffc107;
          margin-right: 5px;
        }

        .rating {
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-outline {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 15px;
          border: 1px solid #007bff;
          border-radius: 4px;
          background: transparent;
          color: #007bff;
          cursor: pointer;
        }

        .btn-solid {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 15px;
          border: none;
          border-radius: 4px;
          background: #ff6b6b;
          color: white;
          cursor: pointer;
        }

        .product-id {
          font-size: 12px;
          color: #666;
        }
      `}</style>
    </>
  );
}

export default ShopHeaderShopPage;

