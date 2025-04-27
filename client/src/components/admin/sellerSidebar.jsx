import { useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Sale Analystics</h2>
        <ul className="mb-6">
          <li className="mb-2">
          <a
            href="/seller/seller-dashboard"
            className={`px-4 ${isActive('/seller/seller-dashboard') ? 'active' : ''}`}
          >
              Dashboard
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Product Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/seller/all-order" className={`px-4 ${isActive('/seller/all-order') ? 'active' : ''}`}>
              All Orders
            </a>
          </li>
          <li className="mb-2">
            <a href="/seller/all-product" className={`px-4 ${isActive('/seller/all-product') ? 'active' : ''}`}>
              All Products
            </a>
          </li>
          <li className="mb-2">
            <a href="/seller/category" className={`px-4 ${isActive('/seller/category') ? 'active' : ''}`}>
              Categories
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Shop Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/seller/shop-information" className={`px-4 ${isActive('/seller/shop-information') ? 'active' : ''}`}>
              Shop Information
            </a>
          </li>
          <li className="mb-2">
            <a href="/seller/seller-banner" className={`px-4 ${isActive('/seller/seller-banner') ? 'active' : ''}`}>
              Marketing Banner
            </a>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;