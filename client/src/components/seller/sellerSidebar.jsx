import { useLocation, Link } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Sale Analystics</h2>
        <ul className="mb-6">
          <li className="mb-2">
              <Link to="/seller/seller-dashboard" className={`px-4 ${isActive('/seller/seller-dashboard') ? 'active' : ''}`}>
                Dashboard 
              </Link>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Product Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <Link to="/seller/all-order" className={`px-4 ${isActive('/seller/all-order') ? 'active' : ''}`}>
              All Orders
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/seller/all-product" className={`px-4 ${isActive('/seller/all-product') ? 'active' : ''}`}>
              All Products
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/seller/category" className={`px-4 ${isActive('/seller/category') ? 'active' : ''}`}>
              Categories
            </Link>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Shop Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <Link to="/seller/shop-information" className={`px-4 ${isActive('/seller/shop-information') ? 'active' : ''}`}>
              Shop Information
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/seller/seller-banner" className={`px-4 ${isActive('/seller/seller-banner') ? 'active' : ''}`}>
              Marketing Banner
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;