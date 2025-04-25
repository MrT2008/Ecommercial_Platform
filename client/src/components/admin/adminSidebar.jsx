
const Sidebar = () => {
    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Announcements</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/admin/announcements" className="text-gray-700 hover:text-[#FFA50B] px-4">
              List Announcements
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Shops Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/admin/list-all-shops" className="text-gray-700 hover:text-[#FFA50B] px-4">
              List Shops
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/pending-shops" className="text-[#FFA50B] font-bold px-4">
              Pending Shops
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/banned-shops" className="text-gray-700 hover:text-[#FFA50B] px-4">
              Banned Shops
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Banners Management</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-[#FFA50B] px-4">
              List Banners
            </a>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;