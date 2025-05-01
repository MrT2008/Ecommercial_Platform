import { useLocation, Link } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;
    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Management Center</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <Link to="/admin/admin-dashboard" className={`${isActive('/admin/admin-dashboard') ? 'active' : ''} text-gray-700 hover:text-[#FFA50B] px-4`}>
              Dashboard
            </Link>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Shops Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <Link to="/admin/list-shops" className={`${isActive('/admin/list-shops') ? 'active' : ''} text-gray-700 hover:text-[#FFA50B] px-4`}>
              All Shops
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/pending-shops" className={`${isActive('/admin/pending-shops') ? 'active' : ''} text-gray-700 hover:text-[#FFA50B] px-4`}>
              Pending Shops
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/banned-shops" className={`${isActive('/admin/banned-shops') ? 'active' : ''} text-gray-700 hover:text-[#FFA50B] px-4`}>
              Banned Shops
            </Link>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Media Management</h2>
        <ul>
          <li className="mb-2">
            <Link to="/admin/announcements" className={`${isActive('/admin/announcements') ? 'active' : ''} text-gray-700 hover:text-[#FFA50B] px-4`}>
              Announcements
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/admin-banner" className={`${isActive('/admin/admin-banner') ? 'active' : ''} text-gray-700 hover:text-[#FFA50B] px-4`}>
              Admin Banners
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;