
const Sidebar = () => {
    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Sale Analystics</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-[#FFA50B] px-4 ">
              Dashboard
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Product Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-[#FFA50B] px-4">
              All Orders
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-[#FFA50B] font-bold px-4">
              All Products
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-[#FFA50B] px-4">
              Categories
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Shop Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-[#FFA50B] px-4">
              Shop Information
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-[#FFA50B] font-bold px-4">
              Marketing Banner
            </a>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;