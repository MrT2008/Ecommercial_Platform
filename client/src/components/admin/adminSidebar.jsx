import { useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;
    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Management Center</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/admin/admin-dashboard" className={`${isActive('/admin/admin-dashboard') ? 'active' : ''} hover:text-[#FFA50B] px-4`}>
              Dashboard
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Shops Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/admin/list-shops" className={`${isActive('/admin/list-shops') ? 'active' : ''}  hover:text-[#FFA50B] px-4`}>
              List Shops
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/pending-shops" className={`${isActive('/admin/pending-shops') ? 'active' : ''} hover:text-[#FFA50B] px-4`}>
              Pending Shops
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/banned-shops" className={`${isActive('/admin/banned-shops') ? 'active' : ''} hover:text-[#FFA50B] px-4`}>
              Banned Shops
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Media Management</h2>
        <ul>
          <li className="mb-2">
            <a href="/admin/announcements" className={`${isActive('/admin/announcements') ? 'active' : ''} text-gray-700 hover:text-[#FFA50B] px-4`}>
              Announcements
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/admin-banner" className={`${isActive('/admin/admin-banner') ? 'active' : ''} hover:text-[#FFA50B] px-4`}>
              Banners
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Role Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/admin/moderator-role" className={`${isActive('/admin/moderator-role') ? 'active' : ''} hover:text-[#FFA50B] px-4`}>
              Moderator Role
            </a>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;